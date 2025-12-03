import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forward — CRM, Training & Consulting",
  description:
    "Advisory-first CRM consulting for resilient Salesforce architectures, secure SFDC↔SFMC integrations, lifecycle marketing automation, and team enablement in regulated industries.",
  keywords: [
    "CRM consulting",
    "Salesforce",
    "SFMC",
    "Marketing Cloud",
    "Veeva",
    "training",
    "integration",
    "governance",
    "GDPR",
    "pharma",
    "healthcare",
    "insurance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
