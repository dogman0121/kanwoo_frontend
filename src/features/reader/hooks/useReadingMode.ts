"use client"

import { ReadingModeEnum } from "@/features/translations/entities/reading-mode.enum"
import { useAppSelector } from "@/lib/state/hooks"
import { useEffect, useState } from "react"
import { selectAligment } from "../states/reading-settings/selectors"
import Reader from "../lib/reader"

export default function useReadingMode(reader: Reader | null) {
    const aligment = useAppSelector(selectAligment)

    const [readingMode, setReadingMode] = useState<ReadingModeEnum | null>(null)

    const getReadingMode = (): ReadingModeEnum | null => {
        if (!reader || !aligment) {
            return null
        }

        if (aligment == "auto") {
            return reader.getReadingMode()
        }
        else {
            if (aligment == "horizontal")
                return ReadingModeEnum.HORIZONTAL
            if (aligment == "vertical")
                return ReadingModeEnum.VERTICAL            
        }

        return null
    }   

    const resetReadingMode = () => {
        setReadingMode(getReadingMode())
    }

    useEffect(() => {
        setReadingMode(getReadingMode())
    }, [aligment])

    return {
        readingMode,
        resetReadingMode
    }
}