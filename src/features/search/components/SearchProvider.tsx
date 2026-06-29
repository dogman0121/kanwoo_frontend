"use client"

import { useEffect, useState, useRef } from "react";
import SearchContext from "../context/SearchContext";
import { searchService } from "../services/api/searchService";
import Team from "@/types/profile/profile";
import SearchSection from "../types/searchSection";
import Manga from "@/types/manga/manga";


function SearchProvider({ children, emptyQuery}: { children: React.ReactNode, emptyQuery: boolean }) {
    const [query, setQuery] = useState<string>("");

    const [section, setSection] = useState<SearchSection>(SearchSection.MANGA);

    const [results, setResults] = useState<Manga[] | Team[]>([]);

    const [filters, setFilters] = useState<Map<string, string[]>>(new Map<string, string[]>());

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const timerId = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        if (!emptyQuery && query === ""){
            setIsLoading(false);
            setResults([]);
            return () => {}
        }

        setIsLoading(true);
        
        timerId.current = setTimeout(async () => {
            const {data} = await searchService.search(query, section, filters);

            setResults(data);

            setIsLoading(false);
        }, 500);

        return () => {
            clearTimeout(timerId.current);
        }
    }, [emptyQuery, query, section, filters])

    return (
        <SearchContext.Provider
            value={{
                query: query,
                setQuery: setQuery,
                section: section,
                setSection: setSection,
                results: results,
                setResults: setResults,
                filters: filters,
                setFilters: setFilters,
                isLoading: isLoading
            }}
        >
            { children }
        </SearchContext.Provider>
    )
}

export default SearchProvider;