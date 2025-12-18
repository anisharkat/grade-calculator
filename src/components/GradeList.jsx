import React from 'react';
import { useApp } from '../context/AppContext';
import { GradeRow } from './GradeRow';
import { EmptyState } from './EmptyState';
import { Button } from './ui/Button';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GradeList = () => {
    const { modules, t, addModule } = useApp();

    if (modules.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="w-full max-w-5xl mx-auto pb-24">
            {/* Desktop Header */}
            <div className="hidden md:grid md:grid-cols-12 md:gap-4 px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 mb-4 text-center items-center">
                <div className="col-span-3 text-start">{t.moduleNumber}</div>
                <div className="col-span-1">{t.coefficient}</div>
                <div className="col-span-2">{t.type}</div>
                <div className="col-span-2">{t.tdGrade}</div>
                <div className="col-span-2">{t.controlGrade}</div>
                <div className="col-span-2">{t.average}</div>
            </div>

            {/* List */}
            <div className="space-y-4 md:space-y-2">
                <AnimatePresence mode="popLayout">
                    {modules.map((module, index) => (
                        <GradeRow key={module.id} module={module} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center px-4">
                <Button
                    onClick={addModule}
                    className="w-full md:w-auto h-12 px-8 gap-2 rounded-xl border-dashed border-2 border-gray-300 bg-white text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-blue-900/10 dark:hover:border-blue-500/50 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                    <Plus className="h-5 w-5" />
                    <span className="font-semibold text-base">{t.addModule}</span>
                </Button>
            </div>
        </div>
    );
};
