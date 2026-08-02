"use client"

import { useEffect, useState, useRef } from "react";
import SearchContext from "../context/SearchContext";
import { searchService } from "../services/api/searchService";
import Team from "@/types/profile/profile";
import SearchSection from "../types/searchSection";
import Manga from "@/types/manga/manga";
import { usePagePagination } from "@/features/pagination/hooks/usePagePagination";
import Profile from "@/types/profile/profile";
import { debounce } from "lodash";


function SearchProvider({ children, emptyQuery}: { children: React.ReactNode, emptyQuery: boolean }) {

    const {
        page,
        setPage,
        results,
        perPage,
        setResults,
        totalCount,
        hasMore,
        setTotalCount,
        reset
    } = usePagePagination<Manga | Profile>({initialPage: 1, perPage: 20})

    const [query, setQuery] = useState<string>("");
    const [section, setSection] = useState<SearchSection>(SearchSection.MANGA);
    const [filters, setFilters] = useState<Map<string, string[]>>(new Map<string, string[]>());
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const loadResults = async (query: string, section: string, filters: Map<string, string[]>) => {
        setIsLoading(true)

        try {
            const response = await searchService.search(query, section, filters, page, perPage)

            setResults(prev => [...prev, ...response.data])
            setPage(prev => prev+1)
            if (response.pagination)
                setTotalCount(response.pagination.total_count)
        } finally {
            setIsLoading(false)
        }
    }

    const debouncedLoadResultsRef = useRef(debounce(async (query, section, filters) => {
        await loadResults(query, section, filters)
    }, 500))

    useEffect(() => {
        
        return () => {
            debouncedLoadResultsRef.current.cancel()
            setResults([])
            reset()
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
                isLoading: isLoading,
                hasMore: hasMore,
                totalCount: totalCount,
                onNext: loadResults,
                emptyQuery: emptyQuery
            }}
        >
            { children }
        </SearchContext.Provider>
    )
}

export default SearchProvider;