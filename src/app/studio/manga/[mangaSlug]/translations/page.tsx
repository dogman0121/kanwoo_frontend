"use client"

import EditHeader from "@/features/edit/components/EditHeader";
import EditHeaderNav from "@/features/edit/components/EditHeaderNav";
import { studioClientApi } from "@/lib/fetch/features/studio/client";
import { setStudioPageMangaTranslations } from "@/lib/state/features/studioPage/studioPageMangaSlice";
import { useAppSelector, useAppStore } from "@/lib/state/hooks";
import { Button, Divider, SxProps, Typography } from "@mui/material";
import { useRef, useState } from "react";
import CreateTranslationDialog from "./_components/CreateTransationDialog";
import TranslationGrid from "../../../_features/translations/TranslationsGrid";
import { clientFetch } from "@/lib/fetch/clientFetch";
import Translation from "@/types/translation/translation";


export default function Page() {
    const store = useAppStore()

    const manga = useAppSelector(state => state.studioPageManga.manga);
    const translations = useAppSelector(state => state.studioPageManga.translations)
    const initialized = useRef(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    if (!initialized.current && manga) {
        initialized.current = true
        clientFetch.get<Translation[]>(`/manga/${manga.slug}/translations`)
            .then((response) => {
                store.dispatch(setStudioPageMangaTranslations(response.data))
            })
    }

    return (
        <>
            <EditHeader>Переводы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                            onClick={() => setDialogOpen(true)}
                        >
                            Создать
                        </Button>
                    </>
                }
            />
            {translations && (
                <TranslationGrid
                    translations={translations}
                />
            )}
            <CreateTranslationDialog 
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </>
    )
}