"use client"

import { createContext } from "react";
import Manga from "@/types/manga";
import Sections from "../types/searchSection";

interface SearchContextProps {
    query: string,
    setQuery: (query: string) => void,
    results: Array<Manga>,
    setResults: (results: any[]) => void,
    section: string,
    setSection: (section: Sections) => void,
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