import React from 'react';
import * as Icons from 'lucide-react';
import { Section } from '../types';

interface SectionGridProps {
  sections: Section[];
  onSectionClick: (sectionId: string) => void;
  selectedSection: string | null;
}

export const SectionGrid: React.FC<SectionGridProps> = ({ 
  sections, 
  onSectionClick, 
  selectedSection 
}) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <Icons.FileText className="w-6 h-6" />;
  };

  const getBackgroundColor = (index: number) => {
    const colors = [
      '#87CE55',
      '#8B5CF6', // purple
      '#87CE55',
      '#8B5CF6'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
            selectedSection === section.id
              ? 'border-[#87CE55] bg-[#87CE55]/5 shadow-lg'
              : 'border-gray-200 bg-white hover:border-[#87CE55]/50 hover:shadow-md'
          }`}
        >
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-md"
            style={{ backgroundColor: getBackgroundColor(index) }}
          >
            <div className="text-white">
              {getIcon(section.icon)}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-[#1E1B3A] mb-2">
            {section.name}
          </h3>
          <p className="text-sm text-gray-500">
            {section.documentCount} documents
          </p>
        </button>
      ))}
    </div>
  );
};