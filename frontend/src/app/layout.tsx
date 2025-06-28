import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie App",
  description: "A simple movie management application",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

        <nav className="bg-white shadow-sm">
          <Navbar />
        </nav>

        <main className="flex-1 container mx-auto my-auto px-2">
          {children}
        </main>

        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
          <Footer />
        </footer>

      </body>
    </html>
  );
}
