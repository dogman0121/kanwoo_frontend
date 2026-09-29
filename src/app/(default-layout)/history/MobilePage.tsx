"use client"

import { AppMobilePageHeader } from "@/components/AppPageHeader"
import MobileContainer from "@/components/MobileContainer"
import HistoryOptions from "./_components/HistoryOptions"

export default function MobilePage() {

    return (
        <>
            <AppMobilePageHeader label="История"/>
            <MobileContainer>
                <HistoryOptions />
            </MobileContainer>
        </>
    )
}