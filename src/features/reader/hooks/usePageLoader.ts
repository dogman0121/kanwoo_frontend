"use client"

import { useContext } from "react"
import pageLoaderContext from "../contexts/pageLoaderContext"

export default function usePageLoader() {
    const {pageLoader} = useContext(pageLoaderContext)
    
    return pageLoader
}