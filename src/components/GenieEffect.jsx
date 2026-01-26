import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GenieEffect() {
    const [isSucked, setIsSucked] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    const steps = [
        "i have a confession to make",
        "this project was inspired from my newfound love for apple",
        "have a nice day"
    ];

    useEffect(() => {
        const handleTrigger = () => {
            setIsSucked(true);
            setTimeout(() => setShowOverlay(true), 800);
        };

        window.addEventListener('trigger-genie', handleTrigger);
        return () => window.removeEventListener('trigger-genie', handleTrigger);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showOverlay) return;

            if (e.key === 'Enter') {
                e.preventDefault();
                if (textIndex < steps.length - 1) {
                    setTextIndex(prev => prev + 1);
                } else {
                    handleReset();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showOverlay, textIndex]);

    useEffect(() => {
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            if (isSucked) {
                appContainer.style.transition = "all 1s cubic-bezier(0.7, 0, 0.3, 1)";
                appContainer.style.transformOrigin = "20px 20px";
                appContainer.style.transform = "scale(0.01) translate(0, 0)";
                appContainer.style.opacity = "0";
                appContainer.style.filter = "blur(20px)";
            } else {
                appContainer.style.transform = "none";
                appContainer.style.opacity = "1";
                appContainer.style.filter = "none";
            }
        }
    }, [isSucked, showOverlay]);

    const handleNext = () => {
        if (textIndex < steps.length - 1) {
            setTextIndex(textIndex + 1);
        }
    };

    const handleReset = () => {
        setIsSucked(false);
        setShowOverlay(false);
        setTextIndex(0);
    };

    return (
        <AnimatePresence>
            {showOverlay && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 text-center"
                    onClick={textIndex < steps.length - 1 ? handleNext : undefined}
                >
                    <motion.div
                        key={textIndex}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6"
                    >
                        <p
                            className="text-2xl md:text-3xl font-light text-white cursor-pointer select-none"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif' }}
                        >
                            {steps[textIndex]}
                        </p>

                        {textIndex < 2 && (
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="self-end"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                                    <polyline points="9 10 4 15 9 20" />
                                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                                </svg>
                            </motion.div>
                        )}

                        {/* Final Step: Return Button */}
                        {textIndex === 2 && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                onClick={(e) => { e.stopPropagation(); handleReset(); }}
                                className="mt-4 px-8 py-3 border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white hover:bg-white/5 transition-all text-sm font-medium tracking-wide"
                            >
                                Return
                            </motion.button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
