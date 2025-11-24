import React, { useRef, useEffect } from 'react';

interface ControlsProps {
  templateName: string;
  onTemplateNameChange: (name: string) => void;
  onSave: () => boolean | void;
  onNew: () => void;
  onShare: () => void;
  error?: string;
}

export const Controls: React.FC<ControlsProps> = ({
  templateName,
  onTemplateNameChange,
  onSave,
  onNew,
  onShare,
  error
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label htmlFor="templateName" className="block text-sm font-medium text-slate-700 mb-1">
            Template Name
          </label>
          <input
            ref={inputRef}
            type="text"
            id="templateName"
            value={templateName}
            onChange={(e) => onTemplateNameChange(e.target.value)}
            className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border
              ${error 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
              }
            `}
            placeholder="e.g. Mage/Necro/Weaver"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onNew}
            className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New
          </button>
          <button
            onClick={onSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save
          </button>
          <button
            onClick={onShare}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Share URL
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
};
