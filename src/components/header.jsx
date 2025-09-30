export default function Logo() {
    return (
      <div itemID="main-header" class="sticky top-0 bg-[#f6f1ee] flex flex-col items-center justify-center py-12">
        <img className="h-20 bg-inherit" src="/react.svg" />
        <div>
          <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
            React Developers Institute
          </h2>
        </div>
      </div>
    );
}