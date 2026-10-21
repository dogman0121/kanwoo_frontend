"use client"

import EditLayout from "@/components/edit/EditLayout"
import { notFound, useParams } from "next/navigation";
import { ApiError } from "@/lib/fetch/api-response.types";
import { Avatar, Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectDrawerOpen, setDrawerOpen } from "@/features/studio/states/studio-page.slice";
import useSection from "@/features/studio/hooks/useSection";
import EditDrawer from "@/components/edit/EditDrawer";
import EditDrawerContainer from "@/components/edit/EditDrawerContainer";
import { routes, toHref } from "@/constants/routes/main.routes";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EditSectionsLinkButton from "@/components/edit/EditSectionsLinkButton";
import EditSectionsButton from "@/components/edit/EditSectionsButton";
import { studioClientAPI } from "@/features/studio/api/client.api";
import { selectProfile, setStudioProfile, setStudioProfilePermissions } from "@/features/studio/states/profile/page.slice";
import { fetchChapter, selectChapter } from "@/features/studio/states/chapter/page.slice";

function StudioDrawer() {
    const dispatch = useAppDispatch()
    
    const chapter = useAppSelector(selectChapter)
    const drawerOpen = useAppSelector(selectDrawerOpen)

    const { section } = useSection()

    if (!chapter) return

    return (
        <EditDrawer
            open={drawerOpen}
            onClose={() => dispatch(setDrawerOpen(false))}
        >
            <EditDrawerContainer>
                <Typography variant="h2">
                    Глава {chapter.chapter} {chapter.name}
                </Typography>
                <List>
                    <EditSectionsLinkButton 
                        link={toHref(routes.studio.chapters.item, {id: chapter.id.toString()})}
                        selected={section == "main"}
                    >
                        <ListItemIcon>
                            <InfoOutlineRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Информация
                        </ListItemText>
                    </EditSectionsLinkButton>
                    
                </List>
            </EditDrawerContainer>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%"
                }}
            >
                <Divider/>
                <List
                    sx={{
                        px: 2
                    }}
                >
                    <EditSectionsButton>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Настройки
                        </ListItemText>
                    </EditSectionsButton>
                </List>
            </Box>
        </EditDrawer>
    )
}

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch()

    const { id } = useParams<{id: string}>()

    useEffect(() => {
        dispatch(fetchChapter(parseInt(id)))
    }, [id])

    return (
        <EditLayout>
            <StudioDrawer/>
            <Box
                sx={{
                    width: "100%"
                }}
            >
                {children}
            </Box>
        </EditLayout>
    )
}