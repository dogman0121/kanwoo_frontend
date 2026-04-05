"use client"

import { clientFetch } from "@/lib/fetch/clientFetch"
import { setHistoryPageReadingProgresses } from "@/lib/state/features/historyPage/historyPageSlice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import ProfileReadingProgress from "@/types/profile/profileReadingProgress"
import { useEffect } from "react"

export default function HistoryLoader({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(state => state.authProfile.profile)

    useEffect(() => {
        if (!authProfile) return;

        clientFetch.get<ProfileReadingProgress[]>(`/profiles/${authProfile.slug}/getHistory`)
            .then((data) => {
                dispatch(setHistoryPageReadingProgresses(data.data))
            })
    }, [])

    return (
        <>
            {children}
        </>
    )
}