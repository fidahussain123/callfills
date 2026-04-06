import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Callfills — AI Lead Generation Engine | Find Every Lead, Close Every Deal",
  description:
    "Callfills watches Facebook, Reddit, Craigslist & Twitter 24/7 for people who need your service. Get verified leads on WhatsApp in under 60 seconds.",
  keywords: [
    "AI lead generation",
    "lead generation SaaS",
    "real-time leads",
    "service business leads",
    "plumber leads",
    "HVAC leads",
    "contractor leads",
  ],
  openGraph: {
    title: "Callfills — Find Every Lead. Close Every Deal.",
    description:
      "AI watches 30+ sources 24/7 and sends you verified leads in under 60 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
