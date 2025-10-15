"use client"

import { setHome } from "@/lib/state/features/home/homeSlice";
import { setManga } from "@/lib/state/features/manga/mangaSlice";
import { useAppStore } from "@/lib/state/hooks";
import Home from "@/types/home";
import { Container } from "@mui/material";
import { useRef } from "react";
import HeroSliderDesktop from "./_components/HeroSliderDesktop";

export default function HomePageDesktop({home}: {home: Home}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setHome(home))
        initialized.current = true
    }

    return (
        <Container maxWidth="lg"
            sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "column",
                rowGap: "25px"
            }}
        >
            <HeroSliderDesktop />
        </Container>
    )

}