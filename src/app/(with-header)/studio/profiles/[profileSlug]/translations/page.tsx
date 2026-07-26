"use client"

import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditHeader from "@/features/edit/components/EditHeader"
import { useAppSelector, useAppStore } from "@/lib/state/hooks"
import TranslationGrid from "../../../_features/translations/TranslationsGrid"
import { useRef, useState } from "react"
import { setStudioPageProfileTranslations } from "@/lib/state/features/studioPage/studioPageProfileSlice"
import { clientFetch } from "@/lib/fetch/clientFetch"
import Translation from "@/types/translation/translation"
import { Button } from "@mui/material"
import CreateTranslationDialog from "./_components/CreateTranslationDialog"

export default function Page() {
    const [createTranslationDialogOpen, setCreateTranslationDialogOpen] = useState(false);

    const profile = useAppSelector(state => state.studioPageProfile.profile);

    const store = useAppStore()

    const translations = useAppSelector(state => state.studioPageProfile.translations)
    const initialized = useRef(false);

    if (!initialized.current && profile) {
        initialized.current = true
        clientFetch.get<Translation[]>(`/profiles/${profile.slug}/translations`)
            .then((response) => {
                store.dispatch(setStudioPageProfileTranslations(response.data))
            })
    }

    if (!profile)
        return null;
    
    return (
        <>
            <EditHeader>Мои переводы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                            onClick={() => setCreateTranslationDialogOpen(true)}
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
                open={createTranslationDialogOpen}
                onClose={() => setCreateTranslationDialogOpen(false)}
            />
        </>
    )
}