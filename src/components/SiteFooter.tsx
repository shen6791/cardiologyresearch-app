export default function SiteFooter({ doctorName, email }: { doctorName: string; email: string }) {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-soft)] mt-24">
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-wrap justify-between items-center gap-6">
        <div>
          <div className="font-display font-semibold">{doctorName}</div>
          <div className="text-sm text-[var(--muted)] mt-1">Ceylon Cardiology Research</div>
        </div>
        <a href={`mailto:${email}`} className="text-[var(--accent)] font-medium text-sm">{email}</a>
        <div className="text-sm text-[var(--muted)]">© {new Date().getFullYear()} Cardiology Research</div>
      </div>
    </footer>
  );
}
