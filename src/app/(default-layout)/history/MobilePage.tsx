"use client"

import { AppMobilePageHeader, BackButton } from "@/components/AppPageHeader"
import MobileContainer from "@/components/MobileContainer"
import HistoryOptions from "./_components/HistoryOptions"
import HistoryList from "./_components/HistoryList"
import { IconButton } from "@mui/material"

export default function MobilePage() {

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