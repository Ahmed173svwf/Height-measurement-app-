import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Person, UnitSystem, LanguageCode } from '../types';
import { Controls } from '../components/Controls';
import { translations } from '../translations';

interface SetupPageProps {
  onSetupComplete: (people: [Person, Person], language: LanguageCode) => void;
}

const SetupPage: React.FC<SetupPageProps> = ({ onSetupComplete }) => {
  const navigate = useNavigate();
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

  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = translations[language];

  // Apply direction to the root element for correct layout mirroring
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = language;
  }, [language, t.dir]);

  const handleSetPerson = (index: 0 | 1, data: Partial<Person>) => {
    setPeople(prev => {
      const newPeople = [...prev] as [Person, Person];
      newPeople[index] = { ...newPeople[index], ...data };
      return newPeople;
    });
  };

  const handleNavigateToResults = () => {
    onSetupComplete(people, language);
    navigate('/results');
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-slate-50 relative overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 relative h-full order-1 md:order-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{t.title}</h1>
          <p className="text-slate-500 mb-8">{t.subtitle}</p>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <h2 className="text-lg font-bold text-slate-700 mb-4">Configure your people</h2>
            <p className="text-sm text-slate-500">Customize their names, colors, and heights below</p>
          </div>
        </div>
      </div>

      {/* Controls Container */}
      <div className="order-2 md:order-2 z-20 flex flex-col justify-end pointer-events-none w-full md:w-auto md:h-full">
        <div className="pointer-events-auto w-full md:w-auto md:h-full flex flex-col justify-end md:justify-center">
          <Controls 
            people={people} 
            setPerson={handleSetPerson} 
            unitSystem={unitSystem}
            setUnitSystem={setUnitSystem}
            onGenerateFact={handleNavigateToResults}
            isAiLoading={false}
            language={language}
            setLanguage={setLanguage}
            isSetupMode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
