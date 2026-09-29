"use client"

import { useEffect, useRef, useState } from "react"
import { HomeBlockData, HomeMap, HomeMapItem } from "../types/hero"
import { homeClientAPI } from "../api/client.api"

export default function useBlockLoader(block: HomeMapItem) {
    
    const [data, setData] = useState<HomeBlockData>([])
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const fetchBlock = async (hash: string) => {
        try{
            setLoading(true)

            const response = await homeClientAPI.getHomeBlock(hash)

            setData(response.data)
        }
        finally {
            setLoading(false)
            setLoaded(true)
        }
    }

    useEffect(() => {
        if (loading || loaded) return

        fetchBlock(block.hash!)
    }, [])

    return {
        data: data,
        loading: loading,
        loaded: loaded
    }
}