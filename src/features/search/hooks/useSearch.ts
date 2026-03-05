"use client"

import { useContext } from "react";
import SearchContext from "../context/SearchContext"

export default function useSearch() {
    const { ...props } = useContext(SearchContext);

    return { ...props }
}