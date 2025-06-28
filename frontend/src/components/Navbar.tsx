import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <div className="container flex items-center justify-between px-2 py-4 mx-auto">
      <Link href="/" className="text-xl font-bold text-gray-900">
        Movie App
      </Link>

      <SearchBar/>
    </div>
  );
}
