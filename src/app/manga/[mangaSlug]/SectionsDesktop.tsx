"use client"

import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs"
import { useState } from "react";

export default function SectionsDesktop() {
    const [section, setSection] = useState('1');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    return (
        <AppTabContext value={section}>
            <AppTabList onChange={handleChange}>
                <AppTab value={"1"} label="Главы" />
            </AppTabList>
            <AppTabPanel value={"1"}>

            </AppTabPanel>
        </AppTabContext>
    )
}