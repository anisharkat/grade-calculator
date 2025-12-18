import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ResultDisplay = () => {
    const { t, modules, average, calculateGlobalAverage } = useApp();

    // If no modules, don't show the sticky footer (EmptyState handles the add button)
    if (modules.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col w-full sm:w-auto text-center sm:text-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{t.totalAverage}</span>
                    <AnimatePresence mode="wait">
                        {average !== null ? (
                            <motion.span
                                key="result"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-3xl font-bold ${parseFloat(average) >= 10 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                            >
                                {average} / 20
                            </motion.span>
                        ) : (
                            <span className="text-xl font-semibold text-gray-300 dark:text-gray-700">--.--</span>
                        )}
                    </AnimatePresence>
                </div>

                <Button size="lg" onClick={calculateGlobalAverage} className="w-full sm:w-auto h-12 gap-2 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 text-lg">
                    <Calculator className="h-6 w-6" />
                    <span>{t.calculate}</span>
                </Button>
            </div>
        </div>
    );
};
