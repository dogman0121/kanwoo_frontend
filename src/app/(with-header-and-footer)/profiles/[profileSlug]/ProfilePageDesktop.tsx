"use client"

import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs"
import { setProfile } from "@/lib/state/features/profile/profileSlice"
import { useAppStore } from "@/lib/state/hooks"
import Profile from "@/types/profile/profile"
import { Avatar, Box, Button, Chip, Container, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function ProfilePageDesktop({profile}: {profile: Profile}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setProfile(profile))
        initialized.current = true
    }

    const aboutRef = useRef<HTMLDivElement>(null);

    const [section, setSection] = useState('1');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };


    useEffect(() => {
        if (!aboutRef.current)
            return;

        const lineHeight = parseFloat(window.getComputedStyle(aboutRef.current).lineHeight);

        aboutRef.current.style.maxHeight = lineHeight + "px";

        return () => {}
    }, [])

    return (
        <Container maxWidth="lg">
            {/* Team header */}
            <Box
                sx={{
                    mt: "55px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: "40px"
                }}
            >
                <Avatar 
                    src={profile.avatar}
                    sx={{
                        width: "180px",
                        height: "180px"
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "20px",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "10px",
                            overflow: "hidden",
                        }}
                    >
                        <Typography variant="h1">{profile.name}</Typography>
                        <Typography variant="caption" fontSize={"14px"}>0 подписчиков</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "20px",
                            }}
                        >
                            <Typography 
                                variant="caption" 
                                fontSize={"14px"}
                                sx={{
                                    overflow: "hidden",         /* Скрываем выходящий за границы текст */
                                    flexGrow: 1,
                                    minWidth: 0,
                                }}
                                ref={aboutRef}
                            >
                                {profile.about || "Подробнее о профиле"}
                            </Typography>
                            <Typography 
                                sx={{
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}
                            >
                                ...показать еще
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "5px"
                            }}
                        >
                            {profile.links?.map((link, ind) => (
                                <Link target="_blank" href={link.link} key={`link_${ind}`}>
                                    <Chip 
                                        icon={
                                            <img 
                                                src={`http://www.google.com/s2/favicons?domain=${new URL(link.link).hostname}&sx=24&type=svg`}
                                            />
                                        } 
                                        label={link.name}
                                        sx={{
                                            "& .MuiChip-icon": {
                                                ml: "10px"
                                            }
                                        }}
                                    />
                                </Link>
                                
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Button variant="contained">
                            Подписаться
                        </Button>
                    </Box>
                </Box>
            </Box>
            {/* Sections */}
            <AppTabContext value={section}>
                <AppTabList onChange={handleChange} sx={{
                    mt: "20px"
                }}>
                    <AppTab value="1" label="Посты" />
                    <AppTab value="2" label="Переводы" />
                </AppTabList>
                <AppTabPanel value="1"></AppTabPanel>
                <AppTabPanel value="2"></AppTabPanel>
            </AppTabContext>
        </Container>
    )
}