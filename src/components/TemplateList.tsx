import React from 'react';
import { SavedTemplate } from '../types';

interface TemplateListProps {
  templates: SavedTemplate[];
  currentTemplateId: string | null;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onShare: (id: string) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  currentTemplateId,
  onLoad,
  onDelete,
  onDuplicate,
  onShare
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-slate-900 mb-4">Saved Templates</h2>
      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {templates.length === 0 ? (
          <p className="text-sm text-slate-500 italic text-center py-4">
            No saved templates yet.
          </p>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className={`flex items-center justify-between p-3 rounded-md border ${
                template.id === currentTemplateId
                  ? 'bg-indigo-50 border-indigo-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex-grow cursor-pointer" onClick={() => onLoad(template.id)}>
                <div className="font-medium text-slate-900">{template.name}</div>
                <div className="text-xs text-slate-500">
                  Last updated: {new Date(template.updatedAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {template.id === currentTemplateId && (
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare(template.id);
                  }}
                  className="text-slate-400 hover:text-indigo-600 p-1"
                  title="Share Template"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(template.id);
                  }}
                  className="text-slate-400 hover:text-indigo-600 p-1"
                  title="Duplicate Template"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(template.id);
                  }}
                  className="text-slate-400 hover:text-red-600 p-1"
                  title="Delete Template"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
