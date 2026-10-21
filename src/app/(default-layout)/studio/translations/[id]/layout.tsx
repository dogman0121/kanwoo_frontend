"use client"

import EditLayout from "@/components/edit/EditLayout"
import { notFound, useParams } from "next/navigation";
import { Avatar, Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectDrawerOpen, setDrawerOpen } from "@/features/studio/states/studio-page.slice";
import useSection from "@/features/studio/hooks/useSection";
import EditDrawer from "@/components/edit/EditDrawer";
import EditDrawerContainer from "@/components/edit/EditDrawerContainer";
import { routes, toHref } from "@/constants/routes/main.routes";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EditSectionsLinkButton from "@/components/edit/EditSectionsLinkButton";
import EditSectionsButton from "@/components/edit/EditSectionsButton";
import { fetchTranslation, selectIsNotFound, selectTranslation, setStudioTranslation } from "@/features/studio/states/translation/page.slice";
import EditBody from "@/components/edit/EditBody";

function StudioDrawer() {
    const dispatch = useAppDispatch()
    
    const translation = useAppSelector(selectTranslation)
    const drawerOpen = useAppSelector(selectDrawerOpen)

    const { section } = useSection()

    if (!translation) return

    return (
        <EditDrawer
            open={drawerOpen}
            onClose={() => dispatch(setDrawerOpen(false))}
        >
            <EditDrawerContainer>
                <Typography variant="h2">Перевод {translation.name}</Typography>
                <List>
                    <EditSectionsLinkButton 
                        link={toHref(routes.studio.translations.item, {id: translation.id.toString()})}
                        selected={section == "main"}
                    >
                        <ListItemIcon>
                            <InfoOutlineRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Информация
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton 
                        link={toHref(routes.studio.translations.chapters, {id: translation.id.toString()})}
                        selected={section == "chapters"}
                    >
                        <ListItemIcon>
                            <LibraryBooksRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Главы
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

    const isNotFound = useAppSelector(selectIsNotFound)

    useEffect(() => {
        dispatch(fetchTranslation(parseInt(id)))
    }, [id])

    if (isNotFound) {
        notFound()
    }

    return (
        <EditLayout>
            <StudioDrawer/>
            <EditBody>
                {children}
            </EditBody>
        </EditLayout>
    )
}