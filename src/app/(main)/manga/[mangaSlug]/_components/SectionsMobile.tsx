import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import { Box } from "@mui/material";
import Description from "./Description";
import Genres from "./Genres";
import NameTranslations from "./NameTranslations";
import Persons from "./Persons";
import Similar from "./Similar";
import { useState } from "react";

export default function SectionsMobile() {
    const [section, setSection] = useState('1');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    return (
        <AppTabContext
            value={section}
        >
            <AppTabList onChange={handleChange}>
                <AppTab label="Информация" value="1"></AppTab>
                <AppTab label="Главы" value="2"></AppTab>
            </AppTabList>
            <AppTabPanel value="1">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "25px"
                    }}
                >
                    <Description />
                    <Genres />
                    <NameTranslations />
                    <Persons />
                    <Similar />
                </Box>
            </AppTabPanel>
            <AppTabPanel value="2">

            </AppTabPanel>
        </AppTabContext>
    )
}