"use client"

import { setStudioPageTranslation, setStudioPageTranslationPermissions } from "@/lib/state/features/studioPage/studioPageTranslationSlice"
import Translation from "@/types/translation/translation"
import TranslationPermission from "@/types/translation/translationPermission"
import { Children, useEffect } from "react"
import { useDispatch } from "react-redux"

export default function StudioTranslationProvider({
    translation,
    translationPermission,
    children
}: {
    translation: Translation,
    translationPermission: TranslationPermission,
    children: React.ReactNode
}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStudioPageTranslation(translation)),
        dispatch(setStudioPageTranslationPermissions(translationPermission))
    }, [translation, translationPermission])

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}