"use client"

import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs"
import { useEffect, useState } from "react";
import Chapters from "./Chapters";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import Translation from "@/types/translation/translation";
import { setMangaPageTranslations } from "@/lib/state/features/mangaPage/mangaSlice";
import { clientFetch } from "@/lib/fetch/clientFetch";

export default function DesktopSections() {
    const dispatch = useAppDispatch()

    const [section, setSection] = useState('1');

    const manga = useAppSelector(state => state.mangaPage.manga)

    useEffect(() => {
        if (!manga) return () => {}

        clientFetch.get<Translation[]>(`/manga/${manga.slug}/getTranslations`)
            .then((data) => {
                dispatch(setMangaPageTranslations(data.data))
            })
    }, [manga])

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    return (
        <AppTabContext value={section}>
            <AppTabList onChange={handleChange}>
                <AppTab value={"1"} label="Главы" />
            </AppTabList>
            <AppTabPanel value={"1"}>
                <Chapters />
            </AppTabPanel>
        </AppTabContext>
    )
}