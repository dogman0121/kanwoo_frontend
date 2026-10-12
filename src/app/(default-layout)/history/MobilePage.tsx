"use client"

import { AppMobilePageHeader } from "@/components/AppPageHeader"
import MobileContainer from "@/components/MobileContainer"
import HistoryOptions from "./_components/HistoryOptions"
import HistoryList from "./_components/HistoryList"

export default function MobilePage() {

    return (
        <>
            <AppMobilePageHeader label="История"/>
            <MobileContainer>
                <HistoryOptions />
                <HistoryList />
            </MobileContainer>
        </>
    )
}