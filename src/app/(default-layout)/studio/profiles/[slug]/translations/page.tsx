"use client"

import { studioClientAPI } from "@/features/studio/api/client.api";
import { useAppDispatch } from "@/lib/state/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { setTranslationsList } from "@/features/studio/states/profile/translations.slice";
import PPage from "./PPage";

export default function Page() {
    const dispatch = useAppDispatch()

    const { slug } = useParams<{slug: string}>()

    const fetchTranslations = async (slug: string) => {
        const response = await studioClientAPI.getProfileTranslations(slug)

        dispatch(setTranslationsList(response.data.map((t, idx) => ({
            data: t,
            context: response.context[idx]
        }))))
    }   

    useEffect(() => {
        fetchTranslations(slug)
    }, [slug])

    return (
        <PPage />
    )
}