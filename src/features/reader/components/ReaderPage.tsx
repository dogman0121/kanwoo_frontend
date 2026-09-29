"use client"

import { RefObject, useEffect, useState } from "react"
import Page from "@/types/chapter/page"
import { Box } from "@mui/material"
import Image from "next/image"
import usePageLoader from "../hooks/usePageLoader"

export interface ReaderPageProps {
    page: Page,
    sx?: Record<string, unknown>,
    disableRender?: boolean,
    ref?: RefObject<HTMLElement | null>
}

export default function ReaderPage({
    page,
    sx,
    disableRender,
    ref
}: ReaderPageProps) {
    const pageLoader = usePageLoader()

    const [imageURLObject, setImageURLObject] = useState<string | null>(null)
    const [aspectRatio, setAspectRation] = useState("")

    const onPageLoaded = () => {
        const imageURL = pageLoader?.getPageImageUrlByUUID(page.uuid)

        if (!imageURL) throw new Error("Failed to get loaded image")
            
        setImageURLObject(imageURL)
    }

    useEffect(() => {
        const imageURL = pageLoader?.getPageImageUrlByUUID(page.uuid)
        if (imageURL) {
            setImageURLObject(imageURL)
        } else {
            pageLoader?.addLoadingCallback(page, onPageLoaded)
        }

        return () => {
            pageLoader?.removeLoadingCallback(page, onPageLoaded)
        }
    }, [page, pageLoader])

    useEffect(() => {
        const width = page.width
        const heigth = page.height

        setAspectRation(`${width} / ${heigth}`)
    }, [page])

    return(
        <>
            {(!imageURLObject || disableRender) ?
                <Box
                    sx={{
                        aspectRatio: aspectRatio,
                        ...sx
                    }}
                    ref={ref}
                />
                :
                <Image
                    alt="Страница"
                    width={page.width}
                    height={page.height}
                    draggable={false}
                    onDragStart={() => false}
                    src={imageURLObject}
                    style={{
                        aspectRatio: aspectRatio,
                        WebkitUserSelect: "none", /* для Safari и Chrome */
                        MozUserSelect: "none",    /* для Firefox */
                        userSelect: "none",
                        height: "auto",
                        width: "auto",
                        
                        ...sx
                    }}
                    ref={ref ? (el) => {ref.current = el} : null}
                />
                
            }
        </>
    )
}