import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

const WELCOME_TEXT = "أهلاً بك في تطبيق حساب المعدل الجامعي!";

export const WelcomeScreen = ({ onEnter }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const chars = [...WELCOME_TEXT];
        let index = 0;
        const interval = setInterval(() => {
            const char = chars[index];
            if (char) {
                setDisplayedText((prev) => prev + char);
                index++;
            }
            if (index >= chars.length) {
                clearInterval(interval);
                setTimeout(() => setShowButton(true), 500);
            }
        }, 50); // Typing speed

        return () => clearInterval(interval);
    }, []);

    return (
        <div dir="rtl" className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent text-center mb-8 min-h-[3rem] px-4 leading-relaxed">
                {displayedText}
            </h1>

            {showButton && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                >
                    <Button onClick={onEnter} size="lg" className="px-8 text-lg rounded-full">
                        دخول الموقع
                    </Button>
                </motion.div>
            )}
        </div>
    );
};
