"use client"

import { useEffect, useRef, useState } from "react"
import Reader from "../lib/reader"
import PageLoader, { PageLoaderProps } from "../lib/page-loader"
import { ProgressSaverProps } from "../lib/progress-controller"
import ProgressController from "../lib/progress-controller"


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
            const progressSaver = new ProgressController(progressSaverProps)

            setReader( 
                new Reader({
                    pageLoader: pageLoader,
                    progressController: progressSaver
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