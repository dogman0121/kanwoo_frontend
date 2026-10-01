"use client"

import { useEffect, useRef, useState } from "react"
import Reader from "../lib/reader"
import PageLoader, { PageLoaderProps } from "../lib/pageLoader"
import ProgressSaver, { ProgressSaverProps } from "../lib/progressSaver"


export default function useReader({
    pageLoaderProps,
    progressSaverProps
}: {
    pageLoaderProps: PageLoaderProps,
    progressSaverProps: ProgressSaverProps
}) {

    const [reader, setReader] = useState<Reader | null>(null)

    useEffect(() => {
        if (!reader) {
            const pageLoader = new PageLoader(pageLoaderProps)
            const progressSaver = new ProgressSaver(progressSaverProps)

            setReader( 
                new Reader({
                    pageLoader: pageLoader,
                    progressSaver: progressSaver
                })
            )
        }

        return () => {
            reader?.destroy()
        }
    }, [])

    return {
        reader: reader,
    }
}