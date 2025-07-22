'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaArrowRight, FaTimes, FaMagic } from 'react-icons/fa';

export default function WhatIfOverlay({
    scenarios = [],
    isVisible,
    onClose,
    onSelectScenario
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const containerRef = useRef(null);
    const timerRef = useRef(null);

    // Reset when opening
    useEffect(() => {
        if (isVisible) {
            setActiveIndex(0);
            setDirection(0);
            setAutoRotate(true);
        } else {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [isVisible]);

    // Auto-rotate scenarios
    useEffect(() => {
        if (!isVisible || scenarios.length <= 1 || !autoRotate) return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % scenarios.length);
        }, 8000);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isVisible, scenarios.length, activeIndex, autoRotate]);

    const handleNext = () => {
        setAutoRotate(false);
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % scenarios.length);
    };

    const handlePrev = () => {
        setAutoRotate(false);
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + scenarios.length) % scenarios.length);
    };

    const handleSelect = () => {
        const currentScenario = scenarios[activeIndex];
        if (currentScenario) {
            onSelectScenario(currentScenario.id);
        }
    };

    if (!scenarios || scenarios.length === 0) return null;

    const currentScenario = scenarios[activeIndex];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="absolute inset-0 bg-black/85 backdrop-blur-md p-6 z-30 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    <motion.div
                        ref={containerRef}
                        className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/10"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <FaLightbulb className="text-xl text-white" />
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">What If?</h3>
                                    <p className="text-sm text-white/60">AI-Generated Scenarios</p>
                                </div>
                            </div>

                            <motion.button
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                            >
                                <FaTimes className="text-lg" />
                            </motion.button>
                        </div>

                        {/* Scenario Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="mb-6"
                                initial={{ opacity: 0, x: direction * 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h4 className="text-lg font-semibold text-white mb-3">
                                    {currentScenario.title}
                                </h4>
                                <p className="text-white/80 leading-relaxed">
                                    {currentScenario.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation & Actions */}
                        <div className="space-y-4">
                            {/* Scenario Navigation */}
                            {scenarios.length > 1 && (
                                <div className="flex items-center justify-between">
                                    <motion.button
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handlePrev}
                                    >
                                        Previous
                                    </motion.button>

                                    <div className="flex space-x-2">
                                        {scenarios.map((_, index) => (
                                            <motion.div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    index === activeIndex ? 'bg-yellow-400' : 'bg-white/30'
                                                }`}
                                                whileHover={{ scale: 1.2 }}
                                            />
                                        ))}
                                    </div>

                                    <motion.button
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleNext}
                                    >
                                        Next
                                    </motion.button>
                                </div>
                            )}

                            {/* Action Button */}
                            <motion.button
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full font-semibold text-white shadow-lg flex items-center justify-center space-x-2 transition-all"
                                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSelect}
                            >
                                <FaArrowRight />
                                <span>Explore This Scenario</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}