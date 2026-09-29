"use client"

import { useContext } from "react"
import pageLoaderContext from "../contexts/pageLoaderContext"

export default function usePageLoader() {
    const {loader} = useContext(pageLoaderContext)
    
    return loader
}