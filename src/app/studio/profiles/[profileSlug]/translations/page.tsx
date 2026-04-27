"use client"

import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditHeader from "@/features/edit/components/EditHeader"
import { useAppSelector, useAppStore } from "@/lib/state/hooks"
import TranslationGrid from "../../../_features/translations/TranslationsGrid"
import { useRef } from "react"
import { setStudioPageProfileTranslations } from "@/lib/state/features/studioPage/studioPageProfileSlice"
import { clientFetch } from "@/lib/fetch/clientFetch"
import Translation from "@/types/translation/translation"

export default function Page() {
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
            />
            {translations && (
                <TranslationGrid 
                    translations={translations}
                />
            )}
        </>
    )
}