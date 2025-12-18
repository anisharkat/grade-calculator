import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { SettingsModal } from './SettingsModal';

export const Header = () => {
    const { t } = useApp();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            {t.title}
                        </h1>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                            {t.subtitle}
                        </p>
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)}>
                        <Settings className="h-5 w-5 md:h-6 md:w-6 transition-transform hover:rotate-90" />
                        <span className="sr-only">Settings</span>
                    </Button>
                </div>
            </header>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
};
