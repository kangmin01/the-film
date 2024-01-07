import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./font";

export const metadata: Metadata = {
  title: "The Film",
  description: "Feel free to share your thoughts on the film",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
