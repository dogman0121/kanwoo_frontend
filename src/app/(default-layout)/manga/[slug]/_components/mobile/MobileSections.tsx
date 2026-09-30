"use client"

import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import { selectManga, selectSection, setSection } from "@/features/manga/states/manga-page/page/slice";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/state/hooks";
import { Box } from "@mui/material";
import CommentsPreview from "./CommentsPreview";
import Description from "@/features/manga/components/Description";
import Genres from "@/features/manga/components/Genres";
import NameTranslations from "@/features/manga/components/NameTranslations";
import Similar from "../Similar";
import ChaptersSection from "../ChapterSection";
import { useEffect, useRef } from "react";

export default function MobileSections() {
    const store = useAppStore()
    const dispatch = useAppDispatch()

    const initialized = useRef(false)
    const manga = useAppSelector(selectManga)
    const section = useAppSelector(selectSection)

    const handleChangeSection = (_event: React.SyntheticEvent, newValue: string) => {
        dispatch(setSection(newValue));
    };

    if (!initialized.current) {
        store.dispatch(setSection("info"))
        initialized.current = true
    }

    if (!manga) return

    return (
        <AppTabContext value={section}>
            <AppTabList onChange={handleChangeSection}>
                <AppTab label="Информация" value={"info"}/>
                <AppTab label="Главы" value={"chapters"} />
            </AppTabList>
            <AppTabPanel value={"info"}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 3
                    }}
                >
                    <CommentsPreview />
                    <Description description={manga.description} />
                    <Genres genres={manga.genres}/>
                    <NameTranslations nameTranslations={manga.name_translations} />
                    <Similar />
                </Box>
            </AppTabPanel>
            <AppTabPanel value={"chapters"}>
                <ChaptersSection />
            </AppTabPanel>
        </AppTabContext>
    )
}