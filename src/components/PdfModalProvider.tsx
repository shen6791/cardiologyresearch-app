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
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-6"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="w-full max-w-4xl max-h-[88vh] bg-white border border-[#e6e3db] rounded-xl flex flex-col overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6e3db]">
              <div className="font-display font-medium truncate pr-4">{modal.title}</div>
              <button onClick={() => setModal(null)} className="text-2xl leading-none text-[#6b6a63] hover:text-black">&times;</button>
            </div>
            <iframe src={modal.url} className="flex-1 w-full bg-white" title="Document preview" />
            <div className="px-6 py-4 border-t border-[#e6e3db] flex justify-end">
              <a href={modal.url} target="_blank" rel="noopener" className="px-5 py-2 rounded-md border border-[#d8d4c8] text-sm font-medium hover:border-[#0f5d52]">Open in new tab</a>
            </div>
          </div>
        </div>
      )}
    </ModalCtx.Provider>
  );
}
