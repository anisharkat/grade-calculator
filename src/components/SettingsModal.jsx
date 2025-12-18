import React, { useEffect, useState } from 'react';
import { X, Moon, Sun, Monitor, Languages, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Card } from './ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsModal = ({ isOpen, onClose }) => {
    const { t, settings, toggleTheme, setLanguage } = useApp();
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md"
                >
                    <Card className="relative overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-lg font-semibold">{t.settings}</h2>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">

                            {/* Theme Toggle */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                        {settings.theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    </div>
                                    <span className="font-medium">{t.theme}</span>
                                </div>
                                <Button variant="outline" onClick={toggleTheme} className="w-32">
                                    {settings.theme === 'light' ? t.light : t.dark}
                                </Button>
                            </div>

                            {/* Language Switch */}
                            {/* Language Switch */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                                        <Languages className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium">{t.language}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {[
                                        { code: 'ar', label: 'العربية' },
                                        { code: 'fr', label: 'Français' },
                                        { code: 'en', label: 'English' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code)}
                                            className={`
                                                relative flex items-center justify-center px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer
                                                hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95
                                                ${settings.lang === lang.code
                                                    ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-500/50 ring-1 ring-purple-500'
                                                    : 'border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400'}
                                            `}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Install App */}
                            {deferredPrompt && (
                                <div className="pt-2">
                                    <Button
                                        variant="primary"
                                        className="w-full gap-2"
                                        onClick={handleInstall}
                                    >
                                        <Download className="h-4 w-4" />
                                        {t.installApp}
                                    </Button>
                                </div>
                            )}

                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex justify-end">
                            <Button onClick={onClose}>{t.close}</Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
