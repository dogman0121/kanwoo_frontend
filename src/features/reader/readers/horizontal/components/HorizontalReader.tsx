"use client"

import ClickScreen from "./ClickScreen"
import SwiperScreen from "./SwiperScreen"
import { useAppSelector } from "@/lib/state/hooks"
import ReaderVariant from "../../../interfaces/reader"
import { selectVariant } from "@/features/reader/states/reading-settings/selectors"


export interface HorizontalOptions extends ReaderVariant {

}

export default function HorizontalReader({
    onLoadNextChapter,
    onPageChange
}: HorizontalOptions) {

    const variant = useAppSelector(selectVariant)

    return (
        <>
            {variant == "swipe" ?
                <SwiperScreen 
                    onPageChange={onPageChange}
                    onLoadNextChapter={onLoadNextChapter}
                />
                :
                <ClickScreen 
                    onPageChange={onPageChange}
                    onLoadNextChapter={onLoadNextChapter}
                />
            }
        </>
    )
}