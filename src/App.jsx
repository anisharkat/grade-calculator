import React, { useState } from 'react';
import { Header } from './components/Header';
import { GradeList } from './components/GradeList';
import { ResultDisplay } from './components/ResultDisplay';
import { SeoManager } from './components/SeoManager';

import { WelcomeScreen } from './components/WelcomeScreen';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-sans text-gray-900 dark:text-gray-50">
      <SeoManager />
      {showWelcome ? (
        <WelcomeScreen onEnter={handleEnter} />
      ) : (
        <>
          <Header />
          <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
            <GradeList />

            <footer className="mt-auto pt-8 pb-4 text-center">
              <a
                href="https://www.instagram.com/anis_harkat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-medium text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"
              >
                Developed by Anis Harkat
              </a>
            </footer>
          </main>
          <ResultDisplay />
        </>
      )}
    </div>
  );
}

export default App;
