import Link from 'next/link';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <div className="container flex items-center justify-between py-4 mx-auto">
      <Link href="/" className="text-xl font-bold text-gray-900">
        Movie App
      </Link>
    </div>
  );
}
