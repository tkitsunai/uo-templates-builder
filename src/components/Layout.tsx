import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            UO Template Builder
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Build, save, and share your Ultima Online character templates.
          </p>
        </header>
        <main className="space-y-6">
          {children}
        </main>
        <footer className="text-center text-xs text-slate-400 mt-12">
          <p>Ultima Online Template Builder</p>
        </footer>
      </div>
    </div>
  );
};
