import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dr. Faslur Rahuman — Cardiology Research",
    template: "%s | Dr. Faslur Rahuman — Cardiology Research",
  },
  description: "Academic research portfolio of Dr. Faslur Rahuman, General & Interventional Cardiologist — publications, clinical trials, and academic presentations in interventional and diagnostic cardiology.",
  openGraph: {
    title: "Dr. Faslur Rahuman — Cardiology Research",
    description: "Academic research portfolio of Dr. Faslur Rahuman, General & Interventional Cardiologist.",
    type: "website",
  },
};

const themeInitScript = `
try {
  var stored = localStorage.getItem('theme');
  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">{children}</body>
    </html>
  );
}
