import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Person, LanguageCode } from './types';
import SetupPage from './pages/SetupPage';
import ResultsPage from './pages/ResultsPage';

const App: React.FC = () => {
  const [people, setPeople] = useState<[Person, Person]>([
    {
      id: 'p1',
      name: 'Person A',
      heightCm: 175,
      color: '#3b82f6',
    },
    {
      id: 'p2',
      name: 'Person B',
      heightCm: 162,
      color: '#ec4899',
    }
  ]);

  const [language, setLanguage] = useState<LanguageCode>('en');

  const handleSetupComplete = (setupPeople: [Person, Person], setupLanguage: LanguageCode) => {
    setPeople(setupPeople);
    setLanguage(setupLanguage);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<SetupPage onSetupComplete={handleSetupComplete} />} 
        />
        <Route 
          path="/results" 
          element={<ResultsPage people={people} language={language} />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
