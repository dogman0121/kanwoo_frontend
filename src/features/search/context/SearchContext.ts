"use client"

import { createContext } from "react";
import Sections from "../types/searchSection";
import Team from "@/types/profile/profile";
import SearchSection from "../types/searchSection";
import Manga from "@/types/manga/manga";
import Profile from "@/types/profile/profile";

interface SearchContextProps {
    query: string,
    setQuery: (query: string) => void,
    results: (Manga | Profile)[],
    setResults: (results: (Manga | Profile)[]) => void,
    section: SearchSection,
    setSection: (section: SearchSection) => void,
    filters: Map<string, string[]>,
    setFilters: (filters: Map<string, string[]>) => void,
    isLoading: boolean,
    hasMore: boolean,
    totalCount: number | null,
    onNext: (query: string, section: string, filters: Map<string, string[]>) => void,
    emptyQuery: boolean
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
    isLoading: false,
    hasMore: true,
    totalCount: null,
    onNext: (query, section, filters) => {},
    emptyQuery: false
});

export default SearchContext;