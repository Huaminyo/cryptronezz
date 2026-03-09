import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptonez",
  description: "The next generation airdrop platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-7xl px-4 py-6 md:px-8">{children}</body>
    </html>
  );
}
