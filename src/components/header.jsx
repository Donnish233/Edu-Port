export default function Header({ isSignedIn, search, setSearch }) {
  return (
    <header
      id="main-header"
      className="sticky top-0 bg-[#f6f1ee] flex flex-col items-center justify-center py-6 shadow-md z-20"
    >
      <img className="h-16 mb-2" src="/react.svg" alt="Logo" />
      <h2 className="text-3xl font-extrabold text-gray-900 text-center text-wrap">
        React Developers Institute
      </h2>

      {isSignedIn && (
        <div className="mt-4 w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by Name or ID..."
            className="w-full border rounded px-3 py-2 shadow-sm"
          />
        </div>
      )}
    </header>
  );
}
