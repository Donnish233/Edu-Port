export default function Header({ isSignedIn, search, setSearch }) {
  return (
    <header
      id="main-header"
      className="sticky top-0 bg-[#f6f1ee] flex flex-col items-center justify-center py-6 shadow-md z-50"
    >
      <img className="h-20 bg-inherit" src="/react.svg" alt="Logo" />
      <div>
        <h2 className="mt-3 text-center text-4xl font-extrabold text-gray-900">
          React Developers Institute
        </h2>
      </div>

      {isSignedIn && (
        <div className="w-full max-w-xl mt-4 px-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or email..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      )}
    </header>
  );
}
