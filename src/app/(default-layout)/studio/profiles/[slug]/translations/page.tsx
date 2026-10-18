"use client"

import { studioClientAPI } from "@/features/studio/api/client.api";
import { useAppDispatch } from "@/lib/state/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import PPage from "./PPage";
import { setTranslationsList } from "@/features/studio/states/profile/translations.slice";

export default function Page() {
    const dispatch = useAppDispatch()

    const { slug } = useParams<{slug: string}>()

    const fetchTranslations = async (slug: string) => {
        const response = await studioClientAPI.getProfileTranslations(slug)

        dispatch(setTranslationsList({translations: response.data, translationsContext: response.context}))
    }   

    useEffect(() => {
        fetchTranslations(slug)
    }, [slug])

    return (
        <PPage />
    )
}