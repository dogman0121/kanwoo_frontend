"use client"

import { studioClientAPI } from "@/features/studio/api/client.api";
import { useAppDispatch } from "@/lib/state/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { setMangaList } from "@/features/studio/states/profile/manga.slice";
import ProfileMangaPage from "@/features/studio/pages/ProfileMangaPage";

export default function Page() {
    return (
        <ProfileMangaPage />
    )
}