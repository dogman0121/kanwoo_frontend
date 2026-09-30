"use client"

import { useEffect, useState, useRef, useCallback } from "react";
import SearchContext from "../context/SearchContext";
import { searchService } from "../services/api/searchService";
import SearchSection from "../types/searchSection";
import { usePagePagination } from "@/lib/use-page-pagination";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Manga } from "@/types/manga";
import { Profile } from "@/types/profile";
import { router } from "@/lib/api/api-config.type";


function SearchProvider({ 
    children, 
    processEmptyQuery,
    fromSearchParams
}: { 
    children: React.ReactNode, 
    processEmptyQuery?: boolean,
    fromSearchParams?: boolean
}) {
    const pathName = usePathname()
    const searchParams  = useSearchParams()

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
    const [loading, setIsLoading] = useState(false)
    const initializedRef = useRef(false);
    const firstFetchProtectRef = useRef(false)
    const loadingRef = useRef(false)


    const loadResults = useCallback(async () => {
        if (loadingRef.current) return
        if (!hasMore) return;

        setIsLoading(true)
        loadingRef.current = true;

        try {
            const response = await searchService.search(query, section, filters, page, perPage);

            setResults(prev => [...prev, ...response.data]);
            setPage(prev => prev + 1);
            if (response.pagination) setTotalCount(response.pagination.total_count);
        } finally {
            loadingRef.current = false
            setIsLoading(false)
        }
    }, [query, section, filters, page, perPage, hasMore, setResults, setPage, setTotalCount]);

    const debouncedLoadResults = useCallback(debounce(async (query, section, filters) => {
        if (fromSearchParams) {
            const currentParams = new URLSearchParams(searchParams.toString())
            
            const compiledParams = searchService.compileParams(query, section, filters)

            for(const key in compiledParams.keys){
                currentParams.delete(key)
            }

            compiledParams.forEach((val, key) => {
                currentParams.append(key, val)
            })

            window.history.replaceState({}, "", pathName + "?" + compiledParams.toString())
        }

        reset()
    }, 500), [])


    useEffect(() => {
        // console.log(debouncedLoadResults, fromSearchParams, query, section, filters, initialized)
        if (!initializedRef.current && fromSearchParams) {
            const {query, section, filters} = searchService.parseParams(searchParams)

            setQuery(query)
            setSection(section)
            setFilters(filters)

            initializedRef.current = true
            firstFetchProtectRef.current = true
            return () => {}
        }

        if (firstFetchProtectRef.current) {
            firstFetchProtectRef.current = false
            return
        }

        debouncedLoadResults(query, section, filters)

    }, [debouncedLoadResults, fromSearchParams, query, section, filters])

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
                isLoading: loading,
                hasMore: hasMore,
                totalCount: totalCount,
                onNext: loadResults,
                processEmptyQuery: processEmptyQuery ? true : false
            }}
        >
            { children }
        </SearchContext.Provider>
    )
}

export default SearchProvider;