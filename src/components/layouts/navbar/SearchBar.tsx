import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import React, { useState, useRef, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"; // Adjust the import path as needed
import { cn } from "@/lib/utils";
import { searchQuizOrCollection } from "@/lib/actions/searchQuizOrCollection"; // Adjust the import path as needed
import { Collection, Quiz } from "@prisma/client"; // Adjust the import path as needed
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

// Define types for SearchResults
type SearchResults = {
  quizzes: Quiz[];
  collections: Collection[];
};

// SearchBar component

type SearchBarProps = {
  userSlug?: string;
};

const SearchBar = ({ userSlug }: SearchBarProps) => {
  // State to manage input focus and query

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    quizzes: [],
    collections: [],
  });

  // Effect to fetch search results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      // Trim query and check if it's empty
      const trimmedQuery = query.trim();
      if (trimmedQuery === "") {
        setSearchResults({ quizzes: [], collections: [] });
        return;
      }

      setLoading(true); // Set loading to true before fetching data

      try {
        // Fetch search results from the server
        const results = await searchQuizOrCollection(trimmedQuery);
        setSearchResults({
          quizzes: results.quizzes.slice(0, 5), // Limit results to 10
          collections: results.collections.slice(0, 5), // Limit results to 10
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults({ quizzes: [], collections: [] });
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchResults();
  }, [query]);

  const { quizzes, collections } = searchResults;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "hidden h-auto cursor-pointer text-xl text-muted-foreground sm:flex",
        )}
      >
        <p className="">Przeszukaj Quizymanie...</p>
        <Search />
      </div>
      <div className="flex flex-1 items-end justify-end sm:hidden">
        <Search onClick={() => setOpen(true)} className="cursor-pointer" />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput onValueChange={setQuery} placeholder="Wyszukaj..." />
        <CommandList>
          {loading && (
            <CommandItem className="flex min-h-[200px] justify-center">
              <span>Wczytywanie...</span>
            </CommandItem>
          )}
          {quizzes.length > 0 && (
            <CommandGroup heading="Quizy">
              {quizzes.map((quiz) => (
                <CommandItem
                  value={quiz.title}
                  onSelect={() => {
                    router.push(`/quizzes/${quiz.slug}`);
                    setOpen(false);
                    setQuery("");
                  }}
                  key={quiz.id}
                >
                  {quiz.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {/* Separator between Quizy and Kolekcje if both are present */}
          {quizzes.length > 0 && collections.length > 0 && <CommandSeparator />}

          {!loading && collections.length > 0 && (
            <CommandGroup heading="Kolekcje">
              {collections.map((collection) => (
                <CommandItem
                  value={collection.title}
                  onSelect={() => {
                    router.push(`/collections/${collection.slug}`);
                    setOpen(false);
                    setQuery("");
                  }}
                  key={collection.id}
                >
                  {collection.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          {!loading && quizzes.length === 0 && collections.length === 0 && (
            <CommandEmpty>Brak wyników.</CommandEmpty>
          )}
          {/* {!loading && ( */}
          <>
            <CommandGroup heading="Skróty">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Quizy</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Kolekcje</span>
              </CommandItem>
              {/* <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem> */}
            </CommandGroup>

            <CommandSeparator />
            {userSlug && (
              <CommandGroup heading="Profil">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Moje Quizy</span>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Ulubione Quizy</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Moje Kolekcje</span>
                </CommandItem>
              </CommandGroup>
            )}
          </>
          {/* )} */}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
