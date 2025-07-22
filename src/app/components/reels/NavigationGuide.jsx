'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaInfoCircle, FaTimes } from 'react-icons/fa';

export default function NavigationGuide({ onClose }) {
    const [showFullGuide, setShowFullGuide] = useState(false);

    return (
        <AnimatePresence>
            {showFullGuide ? (
                <motion.div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Navigation Guide</h2>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <FaArrowUp className="text-blue-400" />
                                <span className="text-white">Swipe up for next episode</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaArrowDown className="text-blue-400" />
                                <span className="text-white">Swipe down for previous episode</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaArrowLeft className="text-purple-400" />
                                <span className="text-white">Swipe left for alternate views</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaArrowRight className="text-purple-400" />
                                <span className="text-white">Swipe right for related content</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold"
                        >
                            Got it!
                        </button>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    className="fixed bottom-24 right-4 z-40"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    <motion.button
                        className="w-12 h-12 bg-primary/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowFullGuide(true)}
                    >
                        <FaInfoCircle className="text-xl" />
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}