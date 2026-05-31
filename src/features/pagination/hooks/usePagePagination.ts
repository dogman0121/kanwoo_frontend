import { useState } from "react";

interface UsePagePaginationOptions {
    perPage?: number;
    initialPage?: number;
}

interface UsePagePaginationResult<T> {
    results: T[];
    setResults: React.Dispatch<React.SetStateAction<T[]>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    perPage: number;
    totalCount: number | null;
    setTotalCount: React.Dispatch<React.SetStateAction<number | null>>;
    hasMore: boolean;
    // Удобный сброс всех данных
    reset: () => void;
}

export function usePagePagination<T>({
    perPage = 20,
    initialPage = 1,
}: UsePagePaginationOptions = {}): UsePagePaginationResult<T> {
    const [results, setResults] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);
    const [totalCount, setTotalCount] = useState<number | null>(null);

    const hasMore = totalCount !== null ? results.length < totalCount : true;

    const reset = () => {
        setResults([]);
        setPage(initialPage);
        setTotalCount(null);
    };

    return {
        results,
        setResults,
        page,
        setPage,
        perPage,
        totalCount,
        setTotalCount,
        hasMore,
        reset,
    };
}
