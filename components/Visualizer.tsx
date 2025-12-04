import React from 'react';
import { Person } from '../types';

interface VisualizerProps {
  personA: Person;
  personB: Person;
}

export const Visualizer: React.FC<VisualizerProps> = ({ personA, personB }) => {
  
  const maxHeight = Math.max(personA.heightCm, personB.heightCm, 150); 
  const viewHeight = maxHeight * 1.25; 
  
  const getPersonShape = () => {
    // Unisex / Geometric Shape
    // Feet at y=100.
    return (
      <g>
        {/* Head */}
        <circle cx="0" cy="12" r="11" fill="currentColor" />
        {/* Body */}
        {/* Rounded rectangle torso with legs split at bottom */}
        <path d="M-16,28 L16,28 Q18,28 18,34 L16,65 L16,100 L4,100 L4,65 L-4,65 L-4,100 L-16,100 L-16,65 L-18,34 Q-18,28 -16,28" fill="currentColor" />
      </g>
    );
  };

  const RenderPerson = ({ person, xPos }: { person: Person; xPos: number }) => {
    return (
      <g transform={`translate(${xPos}, 0)`}>
         {/* Height Label above head */}
        <text 
          x="0" 
          y={-person.heightCm - 12} 
          textAnchor="middle" 
          className="fill-slate-700 text-[9px] font-bold"
        >
          {Math.round(person.heightCm)} cm
        </text>
        
        {/* Name Label below feet */}
        <text 
          x="0" 
          y="25" 
          textAnchor="middle" 
          className="fill-slate-500 text-[9px] uppercase tracking-widest font-semibold"
        >
          {person.name}
        </text>

        {/* The Body */}
        <g 
            transform={`scale(${person.heightCm / 100} ${person.heightCm / 100}) translate(0, -100)`}
            className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            color={person.color}
        >
            {getPersonShape()}
        </g>

        {/* Height Line Marker */}
        <line 
          x1="-40" 
          y1={-person.heightCm} 
          x2="40" 
          y2={-person.heightCm} 
          stroke={person.color} 
          strokeWidth="1" 
          strokeDasharray="4,3" 
          opacity="0.5"
        />
      </g>
    );
  };

  const diff = Math.abs(personA.heightCm - personB.heightCm);
  const maxH = Math.max(personA.heightCm, personB.heightCm);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end bg-slate-50/50 overflow-hidden pb-16 pt-12">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Visualization SVG */}
      <svg 
        viewBox={`-100 -${viewHeight} 200 ${viewHeight + 40}`} 
        className="w-full h-full max-h-[85vh] drop-shadow-xl"
        preserveAspectRatio="xMidYMax"
      >
        {/* Ground Line */}
        <line x1="-500" y1="0" x2="500" y2="0" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

        <RenderPerson person={personA} xPos={-45} />
        <RenderPerson person={personB} xPos={45} />

        {/* Difference Indicator */}
        {diff > 1 && (
            <g transform={`translate(0, -${maxH})`}>
                <line 
                    x1="0" 
                    y1="0" 
                    x2="0" 
                    y2={diff} 
                    stroke="#ef4444" 
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                />
                
                {/* Text Bubble */}
                <g transform={`translate(0, ${diff/2})`}>
                   <rect x="-20" y="-8" width="40" height="16" rx="4" fill="#ef4444" className="drop-shadow-sm" />
                   <text 
                    x="0" 
                    y="3" 
                    textAnchor="middle" 
                    fill="white" 
                    fontSize="8" 
                    fontWeight="bold"
                   >
                    {Math.round(diff)}cm
                   </text>
                </g>
            </g>
        )}

      </svg>
    </div>
  );
};