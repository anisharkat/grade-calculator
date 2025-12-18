import React from 'react';
import { Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

export const GradeRow = ({ module, index }) => {
    const { t, updateModule, removeModule } = useApp();

    const handleUpdate = (field, value) => {
        updateModule(module.id, field, value);
    };

    const isPureExam = module.type === 'pureExam';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-0 md:shadow-none md:rounded-none md:border-0 md:bg-transparent md:grid md:grid-cols-12 md:gap-4 md:items-center py-4"
        >
            {/* Mobile Label & Module Name */}
            <div className="md:col-span-3 mb-4 md:mb-0">
                <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 md:hidden">
                    {t.moduleNumber} {index + 1}
                </span>
                <div className="hidden md:flex items-center h-10 px-3 rounded-md bg-gray-50 dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 border border-transparent">
                    {t.moduleNumber} {index + 1}
                </div>
            </div>

            {/* Coefficient */}
            <div className="md:col-span-1 mb-4 md:mb-0 grid grid-cols-2 md:block gap-4 items-center">
                <label className="block text-sm font-medium text-gray-500 md:hidden">{t.coefficient}</label>
                <Input
                    type="number"
                    inputMode="decimal"
                    min="1"
                    aria-label={t.coefficient}
                    value={module.coef}
                    onChange={(e) => handleUpdate('coef', e.target.value)}
                    className="text-center h-12 md:h-10"
                    placeholder="1"
                />
            </div>

            {/* Type */}
            <div className="md:col-span-2 mb-4 md:mb-0 grid grid-cols-2 md:block gap-4 items-center">
                <label className="block text-sm font-medium text-gray-500 md:hidden">{t.type}</label>
                <Select
                    value={module.type}
                    aria-label={t.type}
                    onChange={(e) => handleUpdate('type', e.target.value)}
                    className="h-12 md:h-10"
                >
                    <option value="mix">{t.mix}</option>
                    <option value="pureExam">{t.pureExam}</option>
                    <option value="mixTp">{t.mixTp}</option>
                </Select>
            </div>

            {/* TD / Continual Assessment */}
            <div className="md:col-span-2 mb-4 md:mb-0 grid grid-cols-2 md:block gap-4 items-center">
                <label className="block text-sm font-medium text-gray-500 md:hidden">
                    {module.type === 'mixTp' ? t.tp : t.td}
                </label>
                <Input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="20"
                    aria-label={module.type === 'mixTp' ? t.tp : t.td}
                    placeholder={isPureExam ? "-" : "0-20"}
                    value={module.td}
                    onChange={(e) => handleUpdate('td', e.target.value)}
                    disabled={isPureExam}
                    className={isPureExam ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed h-12 md:h-10" : "h-12 md:h-10"}
                />
            </div>

            {/* Exam */}
            <div className="md:col-span-2 mb-4 md:mb-0 grid grid-cols-2 md:block gap-4 items-center">
                <label className="block text-sm font-medium text-gray-500 md:hidden">{t.exam}</label>
                <Input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="20"
                    aria-label={t.exam}
                    placeholder="0-20"
                    value={module.exam}
                    onChange={(e) => handleUpdate('exam', e.target.value)}
                    className="font-semibold text-blue-600 dark:text-blue-400 h-12 md:h-10"
                />
            </div>

            {/* Average & Delete */}
            <div className="md:col-span-2 md:flex md:items-center md:justify-between border-t border-gray-100 dark:border-gray-700 md:border-0 pt-3 md:pt-0 mt-2 md:mt-0 flex justify-between items-center">
                <div className="flex flex-col md:hidden">
                    <span className="text-xs text-gray-500">{t.average}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{module.average || "-"}</span>
                </div>

                <div className="hidden md:block font-bold text-gray-900 dark:text-white px-2">
                    {module.average || "-"}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t.delete}
                    onClick={() => removeModule(module.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="h-5 w-5" />
                </Button>
            </div>

        </motion.div>
    );
};
