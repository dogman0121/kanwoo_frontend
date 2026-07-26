import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import { Box } from "@mui/material";
import Description from "../Description";
import Genres from "../Genres";
import NameTranslations from "../NameTranslations";
import Similar from "../Similar";
import { useEffect, useState } from "react";
import Chapters from "../ChapterSection";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import Translation from "@/types/translation/translation";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { setMangaPageTranslations } from "@/lib/state/features/mangaPage/mangaSlice";
import CommentsSection from "../CommentSection";

export default function MobileSections() {
    const [section, setSection] = useState("info");

    const dispatch = useAppDispatch()

    const manga = useAppSelector(state => state.mangaPage.manga)

    useEffect(() => {
        if (!manga) return () => {}

        clientFetch.get<Translation[]>(`/manga/${manga.slug}/translations`)
            .then((data) => {
                dispatch(setMangaPageTranslations(data.data))
            })
    }, [manga])

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    return (
        <AppTabContext
            value={section}
        >
            <AppTabList onChange={handleChange}>
                <AppTab label="Информация" value="info"></AppTab>
                <AppTab label="Главы" value="chapters"></AppTab>
                <AppTab label="Комментарии" value="comments"/>
            </AppTabList>
            <AppTabPanel value="info">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "25px"
                    }}
                >
                    <Description />
                    <Genres />
                    <NameTranslations />
                    <Similar />
                </Box>
            </AppTabPanel>
            <AppTabPanel value="chapters">
                <Chapters />
            </AppTabPanel>
            <AppTabPanel value="comments">
                <CommentsSection />
            </AppTabPanel>
        </AppTabContext>
    )
}