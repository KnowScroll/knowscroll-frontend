'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

export default function EpisodeIndicator({ currentReelId, visible, reels }) {
    const [seriesReels, setSeriesReels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [showIndicator, setShowIndicator] = useState(false);
    const [seriesTitle, setSeriesTitle] = useState('');
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    // Show title after a small delay
    useEffect(() => {
        let titleTimer;
        if (visible && showIndicator) {
            titleTimer = setTimeout(() => setIsTitleVisible(true), 300);
        } else {
            setIsTitleVisible(false);
        }

        return () => {
            if (titleTimer) clearTimeout(titleTimer);
        };
    }, [visible, showIndicator]);

    useEffect(() => {
        const currentReel = reels.find(r => r.id === currentReelId);
        if (!currentReel || !currentReel.seriesId) {
            setShowIndicator(false);
            return;
        }

        // Get all reels in this series, sorted by episode number
        const seriesEpisodes = reels
            .filter(r => r.seriesId === currentReel.seriesId)
            .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));

        if (seriesEpisodes.length <= 1) {
            setShowIndicator(false);
            return;
        }

        // Find current index
        const index = seriesEpisodes.findIndex(r => r.id === currentReelId);

        // Find series title from first reel
        const firstReel = seriesEpisodes[0];
        const titleParts = firstReel.title.split(':');
        const extractedTitle = titleParts.length > 1
            ? titleParts[0].trim()
            : firstReel.title.split(' ').slice(0, 2).join(' ');

        setSeriesTitle(extractedTitle);
        setSeriesReels(seriesEpisodes);
        setCurrentIndex(index);
        setShowIndicator(true);
    }, [currentReelId, reels]);

    if (!showIndicator) return null;

    const maxDisplayDots = 7;
    const condensedView = seriesReels.length > maxDisplayDots;

    const getVisibleEpisodes = () => {
        if (!condensedView) return seriesReels;

        const halfVisible = Math.floor(maxDisplayDots / 2);
        let startIdx = Math.max(0, currentIndex - halfVisible);
        let endIdx = Math.min(seriesReels.length - 1, currentIndex + halfVisible);

        if (startIdx === 0) {
            endIdx = Math.min(seriesReels.length - 1, maxDisplayDots - 1);
        } else if (endIdx === seriesReels.length - 1) {
            startIdx = Math.max(0, seriesReels.length - maxDisplayDots);
        }

        return seriesReels.slice(startIdx, endIdx + 1);
    };

    const visibleEpisodes = getVisibleEpisodes();

    return (
        <AnimatePresence>
            {visible && showIndicator && (
                <motion.div
                    className="absolute top-0 inset-x-0 z-30 pointer-events-none"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col items-center mt-4">
                        {/* Series Title */}
                        <AnimatePresence>
                            {isTitleVisible && (
                                <motion.div
                                    className="mb-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-center shadow-md"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <FaGraduationCap className="text-yellow-400 text-sm" />
                                        <span className="text-sm font-medium text-white">
                                            {seriesTitle}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Episode Dots */}
                        <motion.div
                            className="flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full shadow-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {condensedView && currentIndex > Math.floor(maxDisplayDots / 2) && (
                                <span className="text-xs text-white/60 mr-1">...</span>
                            )}

                            {visibleEpisodes.map((episode, idx) => {
                                const actualIndex = condensedView 
                                    ? seriesReels.findIndex(r => r.id === episode.id)
                                    : idx;
                                const isCurrent = actualIndex === currentIndex;
                                const isCompleted = actualIndex < currentIndex;

                                return (
                                    <motion.div
                                        key={episode.id}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            isCurrent 
                                                ? 'bg-blue-400 w-6' 
                                                : isCompleted 
                                                    ? 'bg-green-400' 
                                                    : 'bg-white/30'
                                        }`}
                                        whileHover={{ scale: 1.3 }}
                                        animate={{
                                            scale: isCurrent ? 1.2 : 1,
                                            opacity: isCurrent ? 1 : isCompleted ? 0.8 : 0.5
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                );
                            })}

                            {condensedView && currentIndex < seriesReels.length - Math.floor(maxDisplayDots / 2) - 1 && (
                                <span className="text-xs text-white/60 ml-1">...</span>
                            )}
                        </motion.div>

                        {/* Episode Counter */}
                        <motion.div
                            className="mt-1 text-xs text-white/60 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Episode {currentIndex + 1} of {seriesReels.length}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}