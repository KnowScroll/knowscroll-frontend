'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaVolumeUp, FaVolumeMute, FaPause, FaInfo, FaRandom } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

export default function ReelsDeck({ reels, initialIndex = 0 }) {
    // Core state
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    // UI state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);

    // Preloading state
    const [preloadedIndexes, setPreloadedIndexes] = useState([]);

    // Refs
    const videoRefs = useRef({});
    const preloadRefs = useRef({});
    const deckRef = useRef(null);
    const controlsTimerRef = useRef(null);

    // Check if we're on mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-hide controls
    useEffect(() => {
        if (controlsTimerRef.current) {
            clearTimeout(controlsTimerRef.current);
        }

        if (controlsVisible && isPlaying && !showInfo) {
            controlsTimerRef.current = setTimeout(() => {
                setControlsVisible(false);
            }, 3000);
        }

        return () => {
            if (controlsTimerRef.current) {
                clearTimeout(controlsTimerRef.current);
            }
        };
    }, [controlsVisible, isPlaying, showInfo]);

    // Preload adjacent videos
    useEffect(() => {
        if (isTransitioning) return;

        const preloadAdjacent = () => {
            const nextIndex = (currentIndex + 1) % reels.length;
            const prevIndex = (currentIndex - 1 + reels.length) % reels.length;

            const toPreload = [nextIndex, prevIndex].filter(idx => !preloadedIndexes.includes(idx));
            if (toPreload.length === 0) return;

            setPreloadedIndexes(prev => [...prev, ...toPreload]);

            toPreload.forEach(idx => {
                const videoToPreload = reels[idx];
                if (videoToPreload) {
                    const preloadVideo = document.createElement('video');
                    preloadVideo.src = videoToPreload.videoUrl;
                    preloadVideo.muted = true;
                    preloadVideo.preload = 'auto';
                    preloadVideo.load();

                    preloadRefs.current[videoToPreload.id] = preloadVideo;
                }
            });
        };

        preloadAdjacent();
    }, [currentIndex, isTransitioning, preloadedIndexes, reels]);

    // Handle video management
    useEffect(() => {
        setVideoLoaded(false);

        Object.values(videoRefs.current).forEach(videoEl => {
            if (videoEl && !videoEl.paused) {
                videoEl.pause();
            }
        });

        const currentVideo = videoRefs.current[reels[currentIndex]?.id];
        if (currentVideo) {
            currentVideo.muted = isMuted;

            const handleCanPlay = () => {
                setVideoLoaded(true);
                if (isPlaying) {
                    currentVideo.play().catch(err => {
                        console.error("Video playback error:", err);
                        setIsPlaying(false);
                    });
                }
            };

            const preloadedVideo = preloadRefs.current[reels[currentIndex]?.id];
            if (preloadedVideo && preloadedVideo.readyState >= 3) {
                currentVideo.src = preloadedVideo.src;
                setVideoLoaded(true);
            }

            currentVideo.addEventListener('canplay', handleCanPlay);

            if (currentVideo.readyState >= 3) {
                handleCanPlay();
            } else {
                currentVideo.load();
            }

            return () => {
                currentVideo.removeEventListener('canplay', handleCanPlay);
            };
        }
    }, [currentIndex, isPlaying, isMuted, reels]);

    // Handle card navigation 
    const navigateToReel = (direction) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setSwipeDirection(direction === 'next' ? 'left' : 'right');
        setControlsVisible(true);

        setTimeout(() => {
            setCurrentIndex(prevIndex => {
                if (direction === 'next') {
                    return (prevIndex + 1) % reels.length;
                } else {
                    return (prevIndex - 1 + reels.length) % reels.length;
                }
            });

            setTimeout(() => {
                setIsTransitioning(false);
                setSwipeDirection(null);
                setIsPlaying(true);
            }, 100);
        }, 300);
    };

    // Handle shuffle animation
    const shuffleDeck = () => {
        if (isTransitioning || isShuffling) return;

        setIsShuffling(true);
        setSwipeDirection('shuffle');
        setControlsVisible(true);

        const getRandomIndex = () => {
            if (reels.length <= 1) return currentIndex;

            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * reels.length);
            } while (newIndex === currentIndex);

            return newIndex;
        };

        const randomIndex = getRandomIndex();

        setTimeout(() => {
            setCurrentIndex(randomIndex);

            setTimeout(() => {
                setIsShuffling(false);
                setSwipeDirection(null);
                setIsPlaying(true);
            }, 400);
        }, 500);
    };

    // Swipe handling
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => !isShuffling && !isTransitioning && navigateToReel('next'),
        onSwipedRight: () => !isShuffling && !isTransitioning && navigateToReel('prev'),
        onTap: () => setControlsVisible(!controlsVisible),
        preventDefaultTouchmoveEvent: true,
        trackMouse: false,
        trackTouch: true,
        delta: 10,
        swipeDuration: 500,
    });

    // UI event handlers
    const togglePlay = (e) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
        setControlsVisible(true);
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
        setControlsVisible(true);
    };

    const toggleInfo = (e) => {
        e.stopPropagation();
        setShowInfo(!showInfo);
        setControlsVisible(true);
    };

    const handleContainerClick = () => {
        setControlsVisible(!controlsVisible);
    };

    const currentReel = reels[currentIndex];

    // Card positioning and animation system
    const getCardTransform = (index) => {
        const distance = Math.min(
            Math.abs(index - currentIndex),
            Math.abs(index + reels.length - currentIndex),
            Math.abs(index - (currentIndex + reels.length))
        );

        if (distance > 2) return null;

        const isCurrentCard = index === currentIndex;

        let transform = {
            x: isCurrentCard ? 0 : (index < currentIndex ? -5 : 5) * distance,
            y: isCurrentCard ? 0 : -10 * distance,
            z: isCurrentCard ? 0 : -20 * distance,
            rotateZ: isCurrentCard ? 0 : (index < currentIndex ? -5 : 5) * distance,
            scale: isCurrentCard ? 1 : 1 - (0.05 * distance),
            opacity: isCurrentCard ? 1 : 1 - (0.2 * distance),
            zIndex: 10 - distance,
        };

        if (isCurrentCard && swipeDirection) {
            if (swipeDirection === 'left') {
                transform.x = -1000;
                transform.rotateZ = -10;
            } else if (swipeDirection === 'right') {
                transform.x = 1000;
                transform.rotateZ = 10;
            } else if (swipeDirection === 'shuffle') {
                transform.y = -200;
                transform.rotateZ = index % 2 ? 120 : -120;
                transform.scale = 0.8;
                transform.opacity = 0;
            }
        }

        if (isCurrentCard && (isTransitioning || isShuffling)) {
            if (swipeDirection === 'left') {
                transform.x = 1000;
                transform.rotateZ = 10;
            } else if (swipeDirection === 'right') {
                transform.x = -1000;
                transform.rotateZ = -10;
            } else if (swipeDirection === 'shuffle') {
                transform.y = 200;
                transform.rotateZ = index % 2 ? -120 : 120;
                transform.scale = 0.8;
                transform.opacity = 0;
            }
        }

        if (isShuffling && !isCurrentCard) {
            const angle = index % 2 ? 30 : -30;
            const xOffset = index % 2 ? 50 : -50;

            transform = {
                ...transform,
                x: xOffset,
                y: -100,
                rotateZ: angle,
                scale: 0.7,
                opacity: 0.5
            };
        }

        return transform;
    };

    // Render a single card
    const renderCard = (reel, index) => {
        const isCurrentCard = index === currentIndex;
        const transform = getCardTransform(index);

        if (!transform) return null;

        const isLoading = isCurrentCard && !videoLoaded && !isTransitioning && !isShuffling;

        return (
            <motion.div
                key={reel.id}
                className={`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-xl ${isCurrentCard ? 'card-active' : 'card-background'}`}
                style={{
                    zIndex: transform.zIndex,
                    willChange: 'transform'
                }}
                initial={false}
                animate={{
                    x: transform.x,
                    y: transform.y,
                    rotateZ: transform.rotateZ,
                    scale: transform.scale,
                    opacity: transform.opacity,
                }}
                transition={{
                    type: 'tween',
                    duration: isShuffling ? 0.6 : 0.3,
                    ease: "easeOut"
                }}
            >
                <div className="absolute inset-0">
                    <div className="relative w-full h-full">
                        {isCurrentCard ? (
                            <>
                                <video
                                    ref={el => videoRefs.current[reel.id] = el}
                                    src={reel.videoUrl}
                                    poster={reel.thumbnailUrl}
                                    className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                                    playsInline
                                    loop
                                    muted={isMuted}
                                    style={{ willChange: 'opacity' }}
                                />

                                {isLoading && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div
                                            className="w-full h-full bg-cover bg-center blur-sm"
                                            style={{ backgroundImage: `url(${reel.thumbnailUrl})` }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                                                <motion.div
                                                    className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${reel.thumbnailUrl})` }}
                            />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${reel.color} opacity-40 mix-blend-overlay`} />
                    </div>

                    {isCurrentCard && (
                        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                            <div className={`flex justify-between items-start transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs">
                                    {reel.tags[0]}
                                </div>

                                <div className="flex space-x-2">
                                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs flex items-center">
                                        {reel.duration}
                                    </div>
                                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs flex items-center">
                                        {reel.views}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <AnimatePresence>
                                    {showInfo && (
                                        <motion.div
                                            className="absolute inset-0 bg-black/80 backdrop-blur-sm p-6 flex flex-col justify-between z-20"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-2xl font-bold">{reel.title}</h3>
                                                <motion.button
                                                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                                                    onClick={toggleInfo}
                                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    ✕
                                                </motion.button>
                                            </div>

                                            <div className="my-4 overflow-auto max-h-[50vh]">
                                                <p className="text-white/80 text-sm mb-4">{reel.subtitle}</p>
                                                <p className="text-white/70 text-sm mb-4">
                                                    This video explores key concepts in {reel.tags.join(', ')},
                                                    providing valuable insights for both beginners and advanced learners.
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {reel.tags.map((tag, i) => (
                                                        <span key={i} className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mb-2 flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-white/20 mr-2 flex items-center justify-center text-xs font-bold">
                                                        {reel.instructor.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm block">{reel.instructor}</span>
                                                        <span className="text-xs text-white/60">Expert Instructor</span>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    className={`w-full py-3 bg-gradient-to-r ${reel.color} rounded-full text-sm flex items-center justify-center mt-4`}
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowInfo(false);
                                                        setIsPlaying(true);
                                                    }}
                                                >
                                                    <FaPlay className="mr-2 text-xs" /> Start Learning
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!showInfo && (
                                    <div className={`transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="mb-2 flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-white/20 mr-2 flex items-center justify-center text-xs font-bold">
                                                {reel.instructor.charAt(0)}
                                            </div>
                                            <span className="text-sm">{reel.instructor}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-1">{reel.title}</h3>
                                        <p className="text-white/80 text-sm mb-4">{reel.subtitle}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {reel.tags.map((tag, i) => (
                                                <span key={i} className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={togglePlay}
                                                >
                                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                                </motion.button>

                                                <motion.button
                                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={toggleMute}
                                                >
                                                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                                                </motion.button>

                                                <motion.button
                                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={toggleInfo}
                                                >
                                                    <FaInfo />
                                                </motion.button>
                                            </div>

                                            <motion.button
                                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    shuffleDeck();
                                                }}
                                            >
                                                <FaRandom />
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isCurrentCard && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <motion.div
                                className={`h-full bg-gradient-to-r ${reel.color}`}
                                initial={{ width: "0%" }}
                                animate={isPlaying && videoLoaded ? { width: "100%" } : { width: "0%" }}
                                transition={isPlaying && videoLoaded ? {
                                    duration: 30,
                                    ease: "linear"
                                } : { duration: 0 }}
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <div
            className="relative h-[500px] md:h-[600px]"
            style={{ perspective: '1000px' }}
        >
            {!isPlaying && !isTransitioning && !isShuffling && (
                <motion.div
                    className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <motion.div
                        className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-center text-sm"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                        {isMobile ? 'Swipe to explore cards' : 'Click shuffle or use arrow keys'}
                    </motion.div>
                </motion.div>
            )}

            {(isShuffling || isTransitioning) && (
                <motion.div
                    className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="px-6 py-3 bg-black/50 backdrop-blur-lg rounded-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <span className="mr-2">{isShuffling ? 'Shuffling' : 'Loading'}</span>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        >
                            ⚡
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}

            <div
                ref={deckRef}
                className="relative w-full h-full flex items-center justify-center"
                onClick={handleContainerClick}
                {...swipeHandlers}
            >
                <div
                    className="relative w-72 h-96 md:w-80 md:h-[450px]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {!isMobile && !isShuffling && !isTransitioning && (
                        <div className={`transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
                            <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToReel('prev');
                                }}
                                style={{
                                    zIndex: 30,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToReel('next');
                                }}
                                style={{
                                    zIndex: 30,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {!isShuffling && !isTransitioning && (
                        <motion.button
                            className="absolute top-2 left-1/2 transform -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                shuffleDeck();
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: controlsVisible ? 1 : 0, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaRandom className="mr-2 text-xs" /> Shuffle Deck
                        </motion.button>
                    )}

                    {reels.map((reel, index) => renderCard(reel, index))}

                    {isMobile && (
                        <div className="absolute inset-x-0 bottom-20 flex justify-center">
                            <motion.div
                                className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-xs text-white/80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isTransitioning ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {swipeDirection === 'left' ? 'Next card' : swipeDirection === 'right' ? 'Previous card' : ''}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                <div className="flex space-x-2">
                    {reels.map((_, i) => (
                        <motion.button
                            key={i}
                            className="w-2 h-2 rounded-full focus:outline-none"
                            style={{
                                backgroundColor: i === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.3)',
                                boxShadow: i === currentIndex ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'
                            }}
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isTransitioning && !isShuffling && i !== currentIndex) {
                                    const direction = i > currentIndex ? 'next' : 'prev';
                                    setCurrentIndex(i);
                                    setSwipeDirection(direction === 'next' ? 'left' : 'right');
                                    setIsTransitioning(true);

                                    setTimeout(() => {
                                        setIsTransitioning(false);
                                        setSwipeDirection(null);
                                        setIsPlaying(true);
                                    }, 300);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}