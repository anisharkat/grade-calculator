import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { PlusCircle, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyState = () => {
    const { t, addModule } = useApp();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center"
        >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-full mb-6 text-blue-500 dark:text-blue-400">
                <Calculator className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{t.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                {t.emptyState}
            </p>
            <Button size="lg" onClick={addModule} className="gap-2 shadow-lg shadow-blue-500/30">
                <PlusCircle className="h-5 w-5" />
                {t.addModule}
            </Button>
        </motion.div>
    );
};
