"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TSortingOption, sortingOptions } from "@/lib/constants/sortingOptions";

const SortingPopover = () => {
  const searchParams = useSearchParams();
  const sortingOptionsArray = Object.values(sortingOptions);
  const selectedSortingOption =
    searchParams.get("sortBy") || ("newest" as TSortingOption);
  selectedSortingOption;
  const selectedOptionIndex = sortingOptionsArray.findIndex(
    (option) => option.value === selectedSortingOption,
  );
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="border-0 outline-none">
          <div className="flex gap-2 text-xl font-semibold text-purple-500">
            <p className="">{sortingOptionsArray[selectedOptionIndex].title}</p>
            <ArrowUpDown />
          </div>
        </MenubarTrigger>
        <MenubarContent className="min-w-[172px]">
          {sortingOptionsArray.map((option) => {
            if (option.value == selectedSortingOption) return null;
            return (
              <MenubarItem asChild key={option.value}>
                <Link href={`?sortBy=${option.value}`} className="text-xl">
                  {option.title}
                </Link>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SortingPopover;
