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
          <div className="w-full max-w-4xl max-h-[88vh] bg-[var(--bg)] border border-[var(--border)] rounded-xl flex flex-col overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <div className="font-display font-medium truncate pr-4">{modal.title}</div>
              <button onClick={() => setModal(null)} className="text-2xl leading-none text-[var(--muted)] hover:text-black">&times;</button>
            </div>
            <iframe src={modal.url} className="flex-1 w-full bg-[var(--bg)]" title="Document preview" />
            <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end">
              <a href={modal.url} target="_blank" rel="noopener" className="px-5 py-2 rounded-md border border-[var(--border-strong)] text-sm font-medium hover:border-[var(--accent)]">Open in new tab</a>
            </div>
          </div>
        </div>
      )}
    </ModalCtx.Provider>
  );
}
