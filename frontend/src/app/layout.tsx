import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie App",
  description: "A simple movie management application",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {

  const handleSearch = (query: string) => {
  };

  return (
    <html lang="en">
      <body>

        <nav className="bg-white shadow-sm">
          <Navbar onSearch={handleSearch} />
        </nav>

        <main className="container mx-auto my-auto">
          {children}
        </main>

      </body>
    </html>
  );
}
