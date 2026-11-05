"use client"

import { AppMobilePageHeader, BackButton } from "@/components/app/AppPageHeader"
import MobileContainer from "@/components/MobileContainer"
import { initializeHistoryPage } from "@/features/progress/states/auth-profile-history-page/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useEffect } from "react"
import HistoryOptions from "../components/HistoryOptions"
import HistoryList from "../components/HistoryList"
import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import { notFound } from "next/navigation"

export default function HistoryPageMobile() {
    const dispatch = useAppDispatch()
    
    const authProfile = useAppSelector(selectAuthProfile)
        
    useEffect(() => {
        if (!authProfile) return

        dispatch(initializeHistoryPage())
    }, [])

    if (!authProfile)
        return notFound()

    return (
        <>
            <AppMobilePageHeader
                startAdornment={
                    <BackButton />
                }
                label="История"
            />
            <MobileContainer>
                <HistoryOptions />
                <HistoryList />
            </MobileContainer>
        </>
    )
}