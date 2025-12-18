import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const AppContext = createContext();

const STORAGE_KEY = 'grade-calc-data';

export const AppProvider = ({ children }) => {
    // Load initial state from local storage or defaults
    const [modules, setModules] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).modules || [] : [];
    });

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const defaultSettings = {
            lang: 'ar',
            theme: systemTheme
        };
        return saved ? { ...defaultSettings, ...JSON.parse(saved).settings } : defaultSettings;
    });

    const [average, setAverage] = useState(null);

    // Persistence
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ modules, settings }));
    }, [modules, settings]);

    // Direction & Language Effect
    useEffect(() => {
        document.documentElement.dir = settings.lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = settings.lang;
    }, [settings.lang]);

    // Theme Effect
    useEffect(() => {
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [settings.theme]);

    const t = translations[settings.lang];

    const addModule = () => {
        const newId = modules.length > 0 ? Math.max(...modules.map(m => m.id)) + 1 : 1;
        setModules([...modules, {
            id: newId,
            name: '',
            coef: '',
            type: 'mix', // mix, pureExam
            td: '',
            exam: '',
            average: 0
        }]);
    };

    const updateModule = (id, field, value) => {
        setModules(prev => prev.map(m => {
            if (m.id !== id) return m;

            const updated = { ...m, [field]: value };

            // Auto calculate row average
            let avg = 0;
            const exam = parseFloat(updated.exam) || 0;
            const td = parseFloat(updated.td) || 0;

            if (updated.type === 'pureExam') {
                avg = exam;
            } else {
                // Standard 60% Exam, 40% TD
                avg = (exam * 0.6) + (td * 0.4);
            }

            updated.average = parseFloat(avg.toFixed(2));
            return updated;
        }));
    };

    const removeModule = (id) => {
        setModules(prev => prev.filter(m => m.id !== id));
    };

    const calculateGlobalAverage = () => {
        let totalCoef = 0;
        let totalPoints = 0;

        modules.forEach(m => {
            const coef = parseFloat(m.coef) || 1;
            totalPoints += m.average * coef;
            totalCoef += coef;
        });

        if (totalCoef === 0) {
            setAverage(0);
        } else {
            setAverage((totalPoints / totalCoef).toFixed(2));
        }
    };

    const toggleTheme = () => {
        setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
    };

    const setLanguage = (lang) => {
        setSettings(prev => ({ ...prev, lang }));
    };

    return (
        <AppContext.Provider value={{
            modules,
            settings,
            t,
            addModule,
            updateModule,
            removeModule,
            average,
            calculateGlobalAverage,
            toggleTheme,
            setLanguage
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
