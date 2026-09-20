import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Faslur Rahuman — Cardiology Research",
  description: "Research portfolio of Dr. Faslur Rahuman, General & Interventional Cardiologist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#1a1a17]">{children}</body>
    </html>
  );
}
