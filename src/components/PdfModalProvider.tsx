'use client';

import { createContext, useState, useContext } from 'react';

type ModalState = { title: string; url: string } | null;
const ModalCtx = createContext<{ open: (title: string, url: string) => void } | null>(null);

export function usePdfModal() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error('usePdfModal must be used within PdfModalProvider');
  return ctx;
}

export default function PdfModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <ModalCtx.Provider value={{ open: (title, url) => setModal({ title, url }) }}>
      {children}
      {modal && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-6"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="w-full max-w-4xl max-h-[88vh] bg-[#0b0f1a] border border-[#1e2740] rounded-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2740]">
              <div className="font-display font-medium truncate pr-4">{modal.title}</div>
              <button onClick={() => setModal(null)} className="text-2xl leading-none text-[#8a97b8] hover:text-white">&times;</button>
            </div>
            <iframe src={modal.url} className="flex-1 w-full bg-white" title="Document preview" />
            <div className="px-6 py-4 border-t border-[#1e2740] flex justify-end">
              <a href={modal.url} target="_blank" rel="noopener" className="px-5 py-2 rounded-full border border-[#1e2740] text-sm font-semibold hover:border-[#4fe3c1]">Open in new tab</a>
            </div>
          </div>
        </div>
      )}
    </ModalCtx.Provider>
  );
}
