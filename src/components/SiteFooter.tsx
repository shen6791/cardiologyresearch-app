export default function SiteFooter({ doctorName, email }: { doctorName: string; email: string }) {
  return (
    <footer className="border-t border-[#e6e3db] bg-[#f7f6f3] mt-24">
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-wrap justify-between items-center gap-6">
        <div>
          <div className="font-display font-semibold">{doctorName}</div>
          <div className="text-sm text-[#6b6a63] mt-1">Ceylon Cardiology Research</div>
        </div>
        <a href={`mailto:${email}`} className="text-[#1d4ed8] font-medium text-sm">{email}</a>
        <div className="text-sm text-[#6b6a63]">© {new Date().getFullYear()} Cardiology Research</div>
      </div>
    </footer>
  );
}
