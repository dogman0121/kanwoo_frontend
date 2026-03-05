"use client"

import { createContext } from "react";
import Sections from "../types/searchSection";
import Team from "@/types/profile/profile";
import SearchSection from "../types/searchSection";
import Manga from "@/types/manga/manga";

interface SearchContextProps {
    query: string,
    setQuery: (query: string) => void,
    results: Manga[] | Team[],
    setResults: (results: Manga[] | Team[]) => void,
    section: SearchSection,
    setSection: (section: SearchSection) => void,
    filters: Map<string, string[]>,
    setFilters: (filters: Map<string, string[]>) => void,
    isLoading: boolean
}

const SearchContext = createContext<SearchContextProps>({
    query: "",
    setQuery: () => {},
    results: [],
    setResults: () => {},
    section: Sections.MANGA,
    setSection: () => {},
    filters: new Map<string, string[]>(),
    setFilters: () => {},
    isLoading: false
});

export default SearchContext;