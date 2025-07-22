'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHeart, FaComment, FaShare, FaLightbulb, FaVolumeUp,
    FaVolumeMute, FaPause, FaPlay, FaInfoCircle, FaKeyboard,
    FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaBookmark
} from 'react-icons/fa';
import EpisodeIndicator from './EpisodeIndicator';
import WhatIfOverlay from './WhatIfOverlay';

export default function ReelPlayer({
    reels,
    users,
    initialReelId,
    onThreadOpen,
    onReelChange,
    onVideoComplete,
    showArrows = false
}) {
    // Core state
    const [currentReel, setCurrentReel] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [showWhatIf, setShowWhatIf] = useState(false);
    const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Navigation state
    const [direction, setDirection] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [nextReels, setNextReels] = useState({});

    // Progress tracking
    const [progress, setProgress] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);

    // Refs
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Check if desktop
    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Initialize with the first reel
    useEffect(() => {
        const initialReel = reels.find(r => r.id === initialReelId) || reels[0];
        if (initialReel) {
            setCurrentReel(initialReel);
        }
    }, [initialReelId, reels]);

    // Find adjacent reels and update navigation state
    const updateAdjacentReels = useCallback((reel) => {
        const adjacentReels = {};

        // VERTICAL NAVIGATION - SERIES
        if (reel.seriesId && reel.episodeNumber) {
            const seriesReels = reels
                .filter(r => r.seriesId === reel.seriesId)
                .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));

            if (seriesReels.length > 1) {
                const currentIndex = seriesReels.findIndex(r => r.id === reel.id);

                // Next episode (up)
                const nextIndex = (currentIndex + 1) % seriesReels.length;
                adjacentReels.up = seriesReels[nextIndex];

                // Previous episode (down)
                const prevIndex = (currentIndex - 1 + seriesReels.length) % seriesReels.length;
                adjacentReels.down = seriesReels[prevIndex];
            }
        }

        // HORIZONTAL NAVIGATION
        if (reel.alternateVersions && reel.alternateVersions.length > 0) {
            const currentIndex = reel.alternateVersions.findIndex(id => id === reel.id);

            if (currentIndex < reel.alternateVersions.length - 1) {
                const nextVersionId = reel.alternateVersions[currentIndex + 1];
                adjacentReels.left = reels.find(r => r.id === nextVersionId);
            } else {
                const firstVersionId = reel.alternateVersions[0];
                adjacentReels.left = reels.find(r => r.id === firstVersionId);
            }

            if (currentIndex > 0) {
                const prevVersionId = reel.alternateVersions[currentIndex - 1];
                adjacentReels.right = reels.find(r => r.id === prevVersionId);
            } else {
                const lastVersionId = reel.alternateVersions[reel.alternateVersions.length - 1];
                adjacentReels.right = reels.find(r => r.id === lastVersionId);
            }
        }
        // For related content by tags
        else if (reel.tags && reel.tags.length > 0) {
            const relatedReels = reels.filter(
                r => r.id !== reel.id && r.tags.some(tag => reel.tags.includes(tag))
            );

            if (relatedReels.length > 0) {
                if (relatedReels.length >= 1) {
                    adjacentReels.left = relatedReels[0];
                }
                if (relatedReels.length >= 2) {
                    adjacentReels.right = relatedReels[1];
                }
            }
        }

        setNextReels(adjacentReels);
    }, [reels]);

    // Update adjacent reels when current reel changes
    useEffect(() => {
        if (currentReel) {
            updateAdjacentReels(currentReel);
            if (onReelChange) {
                onReelChange(currentReel.id);
            }
        }
    }, [currentReel, updateAdjacentReels, onReelChange]);

    // Handle video events
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !currentReel) return;

        const handleLoadedData = () => {
            setVideoLoaded(true);
            setVideoDuration(video.duration);
        };

        const handleTimeUpdate = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        const handleEnded = () => {
            setVideoEnded(true);
            setIsPlaying(false);
            if (onVideoComplete) {
                onVideoComplete();
            }
        };

        const handleError = () => {
            console.error('Video failed to load:', currentReel.videoUrl);
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('error', handleError);
        };
    }, [currentReel, onVideoComplete]);

    // Handle play/pause
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying && videoLoaded) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Video play failed:', error);
                    setIsPlaying(false);
                });
            }
        } else {
            video.pause();
        }
    }, [isPlaying, videoLoaded]);

    // Handle mute
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = isMuted;
        }
    }, [isMuted]);

    // Auto-hide controls
    useEffect(() => {
        if (!showControls) return;

        const timer = setTimeout(() => {
            if (isPlaying && !showWhatIf && !showInfo && !showKeyboardHelp) {
                setShowControls(false);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [showControls, isPlaying, showWhatIf, showInfo, showKeyboardHelp]);

    // Swipe handlers
    const handlers = useSwipeable({
        onSwipedUp: () => navigateToReel('up'),
        onSwipedDown: () => navigateToReel('down'),
        onSwipedLeft: () => navigateToReel('left'),
        onSwipedRight: () => navigateToReel('right'),
        trackMouse: true,
        preventScrollOnSwipe: true,
        delta: 60,
    });

    // Keyboard handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isTransitioning) return;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    navigateToReel('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    navigateToReel('down');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateToReel('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateToReel('right');
                    break;
                case ' ':
                    e.preventDefault();
                    setIsPlaying(!isPlaying);
                    break;
                case 'm':
                case 'M':
                    setIsMuted(!isMuted);
                    break;
                case 'i':
                case 'I':
                    setShowInfo(!showInfo);
                    break;
                case 'w':
                case 'W':
                    if (currentReel?.whatIfScenarios?.length > 0) {
                        setShowWhatIf(!showWhatIf);
                    }
                    break;
                case '?':
                    setShowKeyboardHelp(!showKeyboardHelp);
                    break;
                case 'l':
                case 'L':
                    setIsLiked(!isLiked);
                    break;
                case 'b':
                case 'B':
                    setIsSaved(!isSaved);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, isMuted, showWhatIf, showInfo, showKeyboardHelp, isTransitioning, currentReel, isLiked, isSaved]);

    // Navigate between reels
    const navigateToReel = (direction) => {
        if (!currentReel || isTransitioning) return;

        const nextReel = nextReels[direction];
        if (!nextReel) return;

        setDirection(direction);
        setIsTransitioning(true);
        setShowControls(true);

        setVideoEnded(false);
        setProgress(0);

        setShowWhatIf(false);
        setShowInfo(false);
        setShowKeyboardHelp(false);

        setTimeout(() => {
            setCurrentReel(nextReel);
            setVideoLoaded(false);
            
            setTimeout(() => {
                setDirection(null);
                setIsTransitioning(false);
            }, 150);
        }, 150);
    };

    // Event handlers
    const handleVideoClick = () => {
        setShowControls(true);
        if (!showWhatIf && !showInfo && !showKeyboardHelp) {
            setIsPlaying(!isPlaying);
        }
    };

    const toggleWhatIf = (e) => {
        e?.stopPropagation();
        setShowWhatIf(!showWhatIf);
        setShowControls(true);
    };

    const toggleLike = (e) => {
        e?.stopPropagation();
        setIsLiked(!isLiked);
        setShowControls(true);
    };

    const toggleSave = (e) => {
        e?.stopPropagation();
        setIsSaved(!isSaved);
        setShowControls(true);
    };

    const toggleMute = (e) => {
        e?.stopPropagation();
        setIsMuted(!isMuted);
        setShowControls(true);
    };

    const toggleInfo = (e) => {
        e?.stopPropagation();
        setShowInfo(!showInfo);
        setShowControls(true);
    };

    const toggleKeyboardHelp = (e) => {
        e?.stopPropagation();
        setShowKeyboardHelp(!showKeyboardHelp);
        setShowControls(true);
    };

    const handleWhatIfSelect = (scenarioId) => {
        setShowWhatIf(false);
        setShowControls(true);
    };

    // Get creator info
    const getCreator = () => {
        if (!currentReel) return null;
        return users.find(user => user.id === currentReel.userId);
    };

    const creator = getCreator();

    // Loading state
    if (!currentReel) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <motion.div
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="reel-container h-screen w-full touch-none relative"
            {...handlers}
            onClick={handleVideoClick}
        >
            {/* Video Player */}
            <div className="relative w-full h-full bg-background">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentReel.id}
                        className="absolute inset-0"
                        initial={{
                            opacity: 0,
                            scale: direction ? 1 : 0.95,
                            x: direction === 'right' ? -100 : direction === 'left' ? 100 : 0,
                            y: direction === 'down' ? -100 : direction === 'up' ? 100 : 0
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
                            y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0
                        }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 350,
                            duration: 0.15
                        }}
                    >
                        {/* Main Video Element */}
                        <video
                            ref={videoRef}
                            className={`w-full h-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                            src={currentReel.videoUrl}
                            playsInline
                            muted={isMuted}
                            loop={false}
                            preload="auto"
                            poster={currentReel.thumbnailUrl}
                        />

                        {/* Video Loading Overlay */}
                        {!videoLoaded && (
                            <div className="absolute inset-0 bg-background flex items-center justify-center">
                                <motion.div
                                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Episode Indicator for Series */}
                <EpisodeIndicator 
                    currentReelId={currentReel.id} 
                    visible={showControls}
                    reels={reels}
                />

                {/* Progress Bar */}
                {videoDuration > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                        <motion.div
                            className="h-full bg-primary"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                )}

                {/* Controls Overlay */}
                <AnimatePresence>
                    {showControls && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Top Controls */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                                        {currentReel.title}
                                    </h2>
                                    <p className="text-sm text-white/80 drop-shadow-md max-w-xs">
                                        {currentReel.description}
                                    </p>
                                    {creator && (
                                        <p className="text-xs text-white/70 mt-1 drop-shadow-md">
                                            by {creator.name}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <motion.button
                                        className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm rounded-full shadow-md"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleInfo}
                                    >
                                        <FaInfoCircle className="text-lg" />
                                    </motion.button>

                                    {isDesktop && (
                                        <motion.button
                                            className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm rounded-full shadow-md"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={toggleKeyboardHelp}
                                        >
                                            <FaKeyboard className="text-lg" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>

                            {/* Side Action Buttons */}
                            <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
                                <motion.button
                                    className={`w-12 h-12 flex items-center justify-center ${isLiked ? 'bg-red-600' : 'bg-white/20'} backdrop-blur-sm rounded-full transition-colors duration-200 shadow-lg relative`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleLike}
                                >
                                    <FaHeart className="text-xl text-white" />
                                    <span className="absolute -bottom-5 text-xs drop-shadow-md">
                                        {currentReel.likes + (isLiked ? 1 : 0)}
                                    </span>
                                </motion.button>

                                <motion.button
                                    className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full shadow-lg relative"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onThreadOpen) {
                                            onThreadOpen(currentReel.id);
                                        }
                                    }}
                                >
                                    <FaComment className="text-xl text-white" />
                                    <span className="absolute -bottom-5 text-xs drop-shadow-md">Discuss</span>
                                </motion.button>

                                <motion.button
                                    className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full shadow-lg relative"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle share
                                    }}
                                >
                                    <FaShare className="text-xl text-white" />
                                    <span className="absolute -bottom-5 text-xs drop-shadow-md">Share</span>
                                </motion.button>

                                <motion.button
                                    className={`w-12 h-12 flex items-center justify-center ${isSaved ? 'bg-yellow-600' : 'bg-white/20'} backdrop-blur-sm rounded-full transition-colors duration-200 shadow-lg relative`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleSave}
                                >
                                    <FaBookmark className="text-xl text-white" />
                                    <span className="absolute -bottom-5 text-xs drop-shadow-md">Save</span>
                                </motion.button>

                                {currentReel.whatIfScenarios && currentReel.whatIfScenarios.length > 0 && (
                                    <motion.button
                                        className={`w-12 h-12 flex items-center justify-center ${showWhatIf ? 'bg-primary' : 'bg-white/20'} backdrop-blur-sm rounded-full transition-colors duration-200 shadow-lg relative`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleWhatIf}
                                    >
                                        <FaLightbulb className="text-xl text-white" />
                                        <span className="absolute -bottom-5 text-xs drop-shadow-md">What If</span>
                                    </motion.button>
                                )}
                            </div>

                            {/* Bottom Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center space-x-3">
                                <motion.button
                                    className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm rounded-full shadow-md"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPlaying(!isPlaying);
                                    }}
                                >
                                    {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
                                </motion.button>

                                <motion.button
                                    className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm rounded-full shadow-md"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleMute}
                                >
                                    {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
                                </motion.button>

                                <div className="flex-1" />

                                <div className="text-xs text-white/70">
                                    {Math.floor((videoDuration * progress) / 100 / 60)}:
                                    {String(Math.floor(((videoDuration * progress) / 100) % 60)).padStart(2, '0')} / {Math.floor(videoDuration / 60)}:
                                    {String(Math.floor(videoDuration % 60)).padStart(2, '0')}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Direction Transition Animation */}
                <AnimatePresence>
                    {isTransitioning && direction && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/30 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <motion.div
                                className="w-20 h-20 rounded-full bg-primary/40 backdrop-blur-md flex items-center justify-center shadow-lg"
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.2, opacity: 0 }}
                            >
                                {direction === 'up' && <FaArrowUp className="text-4xl text-white" />}
                                {direction === 'down' && <FaArrowDown className="text-4xl text-white" />}
                                {direction === 'left' && <FaArrowLeft className="text-4xl text-white" />}
                                {direction === 'right' && <FaArrowRight className="text-4xl text-white" />}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* What If Scenarios Overlay */}
                {currentReel.whatIfScenarios && (
                    <WhatIfOverlay
                        scenarios={currentReel.whatIfScenarios}
                        isVisible={showWhatIf}
                        onClose={() => setShowWhatIf(false)}
                        onSelectScenario={handleWhatIfSelect}
                    />
                )}

                {/* Info Modal */}
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            className="absolute inset-0 bg-black/85 backdrop-blur-md p-6 z-20"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowInfo(false);
                            }}
                        >
                            <div className="max-w-md mx-auto mt-20">
                                <h3 className="text-2xl font-bold text-white mb-4">{currentReel.title}</h3>
                                <p className="text-white/80 leading-relaxed mb-4">{currentReel.description}</p>
                                
                                <div className="space-y-2 text-sm text-white/60">
                                    <p>Duration: {Math.floor(currentReel.duration / 60)}:{String(currentReel.duration % 60).padStart(2, '0')}</p>
                                    <p>Views: {currentReel.views.toLocaleString()}</p>
                                    <p>Likes: {currentReel.likes.toLocaleString()}</p>
                                    {creator && <p>Created by: {creator.name}</p>}
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {currentReel.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-primary/30 rounded-full text-xs text-white">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Keyboard Help Modal */}
                <AnimatePresence>
                    {showKeyboardHelp && (
                        <motion.div
                            className="absolute inset-0 bg-black/85 backdrop-blur-md p-6 z-20"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowKeyboardHelp(false);
                            }}
                        >
                            <div className="max-w-md mx-auto mt-20">
                                <h3 className="text-2xl font-bold text-white mb-6">Keyboard Shortcuts</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">Arrow Keys</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Navigate</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">Space</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Play/Pause</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">M</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Mute/Unmute</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">I</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Info Panel</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">W</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">What If</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">L</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Like</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">B</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Bookmark</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">?</span>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Help</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}