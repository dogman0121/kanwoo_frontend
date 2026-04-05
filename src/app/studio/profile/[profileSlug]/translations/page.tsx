"use client"

import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditHeader from "@/features/edit/components/EditHeader"
import { useAppSelector, useAppStore } from "@/lib/state/hooks"
import TranslationGrid from "../../../_features/translations/TranslationsGrid"
import { useRef, useState } from "react"
import { studioClientApi } from "@/lib/fetch/features/studio/client"
import { setStudioPageProfileTranslations } from "@/lib/state/features/studioPage/studioPageProfileSlice"

export default function Page() {
    const profile = useAppSelector(state => state.studioPageProfile.profile);

    const store = useAppStore()

    const translations = useAppSelector(state => state.studioPageProfile.translations)
    const initialized = useRef(false);

    if (!initialized.current && profile) {
        initialized.current = true
        studioClientApi.getProfileTranslations(profile.slug)
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