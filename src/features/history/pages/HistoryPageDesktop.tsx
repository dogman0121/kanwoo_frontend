"use client"

import AppPageHeader from "@/components/app/AppPageHeader"
import { initializeHistoryPage } from "@/features/progress/states/auth-profile-history-page/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Container } from "@mui/system"
import { useEffect } from "react"
import HistoryOptions from "../components/HistoryOptions"
import HistoryList from "../components/HistoryList"
import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import { notFound } from "next/navigation"

export default function HistoryPageDesktop() {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)
    
    useEffect(() => {
        if (!authProfile) return

        dispatch(initializeHistoryPage())
    }, [])

    if (!authProfile)
        return notFound()

    return (
        <Container maxWidth="lg" sx={{mt: 10}}>
            <AppPageHeader label="История чтения"/>
            <HistoryOptions />
            <HistoryList />
        </Container>
    )
}