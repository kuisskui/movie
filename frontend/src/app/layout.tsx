import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import config from "@/config";

export const metadata: Metadata = {
  title: config.siteName
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen gap-2">
        <header>
          <Navbar />
        </header>

        <main className="flex-1 container mx-auto my-auto">
          {children}
        </main>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
