import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./font";
import Navbar from "../components/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

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
      <body className={inter.className}>
        <AuthContext>
          <header className="sticky top-0 bg-white z-10">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal"></div>
      </body>
    </html>
  );
}
