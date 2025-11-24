import React from 'react';
import { Skill } from '../types';

interface SkillSectionProps {
  skills: Skill[];
  onAddSkill: () => void;
  onUpdateSkill: (id: string, field: keyof Skill, value: string | number) => void;
  onRemoveSkill: (id: string) => void;
}

export const SkillSection: React.FC<SkillSectionProps> = ({
  skills,
  onAddSkill,
  onUpdateSkill,
  onRemoveSkill
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-slate-900">Skills</h2>
        <button
          onClick={onAddSkill}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Skill
        </button>
      </div>
      
      <div className="space-y-3">
        {skills.length === 0 && (
          <p className="text-sm text-slate-500 italic">No skills added yet.</p>
        )}
        {skills.map((skill) => (
          <div key={skill.id} className="flex gap-3 items-center">
            <div className="flex-grow">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => onUpdateSkill(skill.id, 'name', e.target.value)}
                placeholder="Skill Name (e.g. Magery)"
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <div className="w-24">
              <input
                type="number"
                value={skill.value}
                onChange={(e) => onUpdateSkill(skill.id, 'value', e.target.value)}
                placeholder="100.0"
                step="0.1"
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <button
              onClick={() => onRemoveSkill(skill.id)}
              className="text-red-600 hover:text-red-800 p-2"
              title="Remove Skill"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
