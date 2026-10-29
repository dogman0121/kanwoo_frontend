"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { throttle } from "lodash"
import { useCallback, useEffect, useRef } from "react"
import { loadBlocks, selectBlocks } from "../states/home-page/slice"

export default function useBlockLoader() {
    const dispatch = useAppDispatch()

    const blocks = useAppSelector(selectBlocks)

    const requestedBlocksRef = useRef<Record<string, number>>({})

    const throttledLoadBlock = useCallback(throttle(() => {
        const hashList = Object.keys(requestedBlocksRef.current)
        if (hashList.length == 0)
            return

        dispatch(loadBlocks(hashList))

        requestedBlocksRef.current = {}
    }, 150, {leading: true, trailing: true}), [dispatch])

    const loadBlock = useCallback((hash: string) => {
        //console.log(blocks)
        if (Object.keys(blocks).length == 0) return

        if (blocks[hash].status == "idle") {
            requestedBlocksRef.current[hash] = 1
        }

        throttledLoadBlock()
    }, [blocks, throttledLoadBlock])

    return {
        loadBlock
    }
}