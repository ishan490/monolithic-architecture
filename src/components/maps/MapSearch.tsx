import { useEffect, useRef, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

type SearchResult = {
  label: string;
  x: number;
  y: number;
};

type Props = {
  placeholder: string;
  onSelect: (
    lat: number,
    lng: number,
    label: string
  ) => void;
};

const provider = new OpenStreetMapProvider();

export default function MapSearch({
  placeholder,
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    SearchResult[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  // Search API
  useEffect(() => {
    const delayDebounce = setTimeout(
      async () => {
        if (query.trim().length < 3) {
          setResults([]);
          return;
        }

        try {
          setLoading(true);

          const searchResults: any =
            await provider.search({
              query,
            });

          setResults(searchResults);
          setShowDropdown(true);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      400
    );

    return () =>
      clearTimeout(delayDebounce);
  }, [query]);

  // Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Clear Input
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onFocus={() => {
            if (results.length > 0) {
              setShowDropdown(true);
            }
          }}
          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />

        {/* CLEAR BUTTON */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-600 transition hover:bg-red-100 hover:text-red-500 dark:bg-gray-800 dark:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-2 px-2 text-xs text-gray-500">
          Searching...
        </div>
      )}

      {/* DROPDOWN */}
      {showDropdown &&
        results.length > 0 && (
          <div className="absolute z-[9999] mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            {results.map(
              (item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Set input value
                    setQuery(item.label);

                    // Close dropdown
                    setShowDropdown(false);

                    // Clear results
                    setResults([]);

                    // Send selected location
                    onSelect(
                      Number(item.y),
                      Number(item.x),
                      item.label
                    );
                  }}
                  className="w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-blue-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <div className="flex items-start gap-3">
                    {/* ICON */}
                    <div className="mt-1 text-blue-500">
                      📍
                    </div>

                    {/* TEXT */}
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        )}


        
    </div>
  );
}