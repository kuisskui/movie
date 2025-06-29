import Link from 'next/link';
import SearchBar from './SearchBar';
import config from '@/config';

export default function Navbar() {
  return (
    <nav className="shadow-sm">
      <div className="container flex items-center justify-between py-4 mx-auto">
        <Link href="/" className="text-xl font-bold text-gray-900">
          {config.siteName}
        </Link>

        <SearchBar />
      </div>
    </nav>
  );
}
