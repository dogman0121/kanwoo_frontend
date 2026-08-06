"use client"

import { useEffect, useState, useRef } from "react";
import SearchContext from "../context/SearchContext";
import { searchService } from "../services/api/searchService";
import SearchSection from "../types/searchSection";
import Manga from "@/types/manga/manga";
import { usePagePagination } from "@/features/pagination/hooks/usePagePagination";
import Profile from "@/types/profile/profile";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


function SearchProvider({ 
    children, 
    emptyQuery,
    fromSearchParams
}: { 
    children: React.ReactNode, 
    emptyQuery?: boolean,
    fromSearchParams?: boolean 
}) {
    const router = useRouter()
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
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const loadResults = async (query: string, section: SearchSection, filters: Map<string, string[]>) => {
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
        if (fromSearchParams) {
            const currentParams = new URLSearchParams(searchParams.toString())

            const compiledParams = searchService.compileParams(query, section, filters)

            for(const key in compiledParams.keys){
                currentParams.delete(key)
            }

            compiledParams.forEach((val, key) => {
                currentParams.append(key, val)
            })

            router.replace(pathName + "?" + compiledParams.toString())
        }

        setResults([])
        reset()
    }, 500))

    useEffect(() => {
        if (fromSearchParams) {
            const {query, section, filters} = searchService.parseParams(searchParams)
            
            setQuery(query)
            setSection(section)
            setFilters(filters)
        }
    }, [])

    useEffect(() => {
        debouncedLoadResultsRef.current(query, section, filters)
    }, [query, section, filters])

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
                emptyQuery: emptyQuery ? true : false
            }}
        >
            { children }
        </SearchContext.Provider>
    )
}

export default SearchProvider;