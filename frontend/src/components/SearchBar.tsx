export default function SearchBar() {

  return (
    <div className="w-3/5 sm:w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        className="text-sm w-full px-4 py-1 border border-gray-300 rounded-full focus:outline-none"
      />
    </div>
  );
}