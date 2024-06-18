// Import necessary dependencies and types
import React, { useState, useRef, useEffect } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"; // Adjust the import path as needed
import { cn } from "@/lib/utils";
import { searchQuizOrCollection } from "@/lib/actions/searchQuizOrCollection"; // Adjust the import path as needed
import { Collection, Quiz } from "@prisma/client"; // Adjust the import path as needed
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import useMediaQuery from "@/lib/hooks/use-media-querry";

// Define types for SearchResults
type SearchResults = {
  quizzes: Quiz[];
  collections: Collection[];
};

// SearchBar component
const SearchBar: React.FC = () => {
  // State to manage input focus and query

  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const pathName = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    quizzes: [],
    collections: [],
  });

  // Ref for CommandList element
  const listRef = useRef<HTMLDivElement>(null);

  // Effect to fetch search results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      // Trim query and check if it's empty

      const trimmedQuery = query.trim();
      if (trimmedQuery === "") {
        setSearchResults({ quizzes: [], collections: [] });
        return;
      }

      try {
        // Fetch search results from the server
        const results = await searchQuizOrCollection(trimmedQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults({ quizzes: [], collections: [] });
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    setIsFocused(false);
  }, [pathName]);

  // Event handler for input focus
  const handleFocus = () => setIsFocused(true);

  // Event handler for input blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check if blur event is related to clicking inside CommandList
    if (listRef.current && listRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsFocused(false);
  };

  // Event handler for input change

  // Destructure quizzes and collections from searchResults
  const { quizzes, collections } = searchResults;

  return (
    <>
      <div className="flex flex-1 items-end justify-end sm:hidden">
        <Search onClick={() => setIsFocused(true)} className="cursor-pointer" />
      </div>
      <div
        className={cn(
          "fixed top-20 w-[94vw] sm:static sm:w-[300px] md:w-[425px]",
          isFocused && isSmallScreen ? "" : "hidden sm:block",
        )}
      >
        <Command
          className={cn(
            "rounded-xl border border-primary sm:top-auto",
            // isFocused && isSmallScreen ? "hidden" : "",
            isFocused && (quizzes.length || collections.length)
              ? "rounded-b-none rounded-t-xl"
              : "rounded-xl",
          )}
        >
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Wyszukaj..."
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-[10vw] border-primary sm:w-full"
          />
          {isFocused ? (
            <CommandList
              ref={listRef}
              className={cn(
                `absolute top-14 z-10 w-[94vw] -translate-x-[1px] rounded-b-xl border border-primary bg-background sm:w-[300px] md:w-[425px]`,
                quizzes.length === 0 && collections.length === 0
                  ? "hidden"
                  : "block",
              )}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking inside the list
              tabIndex={-1} // Make it focusable
              onBlur={handleBlur}
            >
              {/* Conditional rendering based on search results */}
              {quizzes.length === 0 &&
              collections.length === 0 &&
              query ? null : (
                <>
                  {quizzes.length > 0 && (
                    <CommandGroup heading="Quizy">
                      {quizzes.map((quiz) => (
                        <CommandItem
                          // children={'juj'}
                          value={quiz.title}
                          onSelect={() => router.push(`/quizzes/${quiz.slug}`)}
                          key={quiz.id}
                          data-disabled={false} // Example data attribute, adjust as needed
                          data-selected={false} // Example data attribute, adjust as needed
                        >
                          {/* <Link href={`/quizzes/${quiz.slug}`}> */}
                          {quiz.title}
                          {/* </Link> */}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {/* Separator between Quizy and Kolekcje if both are present */}
                  {quizzes.length > 0 && collections.length > 0 && (
                    <CommandSeparator />
                  )}
                  {collections.length > 0 && (
                    <CommandGroup heading="Kolekcje">
                      {collections.map((collection) => (
                        <CommandItem
                          key={collection.id}
                          data-disabled={false} // Example data attribute, adjust as needed
                          data-selected={false} // Example data attribute, adjust as needed
                        >
                          {collection.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          ) : null}
        </Command>
      </div>
    </>
  );
};

export default SearchBar;
