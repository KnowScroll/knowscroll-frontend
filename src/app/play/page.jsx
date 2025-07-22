'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReelPlayer from '../components/reels/ReelPlayer';
import { reels } from '../../data/reels';
import { users } from '../../data/users';

export default function PlayPage() {
    const router = useRouter();
    const [showNavigationGuide, setShowNavigationGuide] = useState(false);

    const handleThreadOpen = (reelId) => {
        console.log('Opening thread for reel:', reelId);
        // You can implement thread functionality later
    };

    const handleReelChange = (reelId) => {
        console.log('Changed to reel:', reelId);
    };

    const handleVideoComplete = () => {
        console.log('Video completed');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="h-screen relative bg-background">
            {/* Back Button - Only show initially */}
            <motion.button
                className="absolute top-4 left-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                initial={{ opacity: 1 }}
                animate={{ 
                    opacity: 1,
                    pointerEvents: 'auto'
                }}
                transition={{ delay: 0.5 }}
            >
                <ArrowLeft size={20} />
            </motion.button>

            {/* ReelPlayer Component */}
            <ReelPlayer
                reels={reels}
                users={users}
                initialReelId={reels[0]?.id}
                onThreadOpen={handleThreadOpen}
                onReelChange={handleReelChange}
                onVideoComplete={handleVideoComplete}
                showArrows={true}
            />

            {/* Instructions Overlay - Shows briefly on first load */}
            <motion.div
                className="absolute bottom-20 left-4 right-4 z-40 pointer-events-none"
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 0, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <div className="bg-black/70 backdrop-blur-md rounded-2xl p-4 text-center">
                    <p className="text-white/90 text-sm mb-2">🎬 Swipe or use arrow keys to navigate</p>
                    <p className="text-white/70 text-xs">
                        ↕️ Episodes • ↔️ Related Content • Space: Play/Pause
                    </p>
                </div>
            </motion.div>
        </div>
    );
}