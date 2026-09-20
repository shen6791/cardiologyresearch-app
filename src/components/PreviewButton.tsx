'use client';

import { usePdfModal } from './PdfModalProvider';

export default function PreviewButton({ label, url, title }: { label: string; url: string; title: string }) {
  const { open } = usePdfModal();
  return (
    <button type="button" onClick={() => open(`${title} — ${label}`, url)} className="text-[#4a5d23] hover:underline">
      {label}
    </button>
  );
}
