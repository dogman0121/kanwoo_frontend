"use client"

import AppPageHeader from "@/components/AppPageHeader"
import { Container } from "@mui/material"
import HistoryOptions from "./_components/HistoryOptions"
import HistoryList from "./_components/HistoryList"

export default function DesktopPage() {

    return (
        <Container maxWidth="lg" sx={{mt: 10}}>
            <AppPageHeader label="История чтения"/>
            <HistoryOptions />
            <HistoryList />
        </Container>
    )
}