"use client"

import { studioClientAPI } from "@/features/studio/api/client.api";
import { useAppDispatch } from "@/lib/state/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { setMangaList } from "@/features/studio/states/profile/manga.slice";
import PPage from "./PPage";

export default function Page() {
    const dispatch = useAppDispatch()

    const { slug } = useParams<{slug: string}>()

    const fetchManga = async (slug: string) => {
        const response = await studioClientAPI.getProfileManga(slug)

        dispatch(setMangaList(response.data.map((m, ind) => ({
            data: m,
        }))))
    }   

    useEffect(() => {
        fetchManga(slug)
    }, [slug])

    return (
        <PPage />
    )
}