"use client"

import EditLayout from "@/components/edit/EditLayout"
import { notFound, useParams } from "next/navigation";
import { ApiError } from "@/lib/fetch/api-response.types";
import { Avatar, Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ProfilePermission from "@/types/profile/profilePermission";
import { clientFetch } from "@/lib/fetch/client-fetch.util";
import { useEffect, useState } from "react";
import { Profile } from "@/types/profile";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectDrawerOpen, setDrawerOpen } from "@/features/studio/states/studio-page.slice";
import useSection from "@/features/studio/hooks/useSection";
import EditDrawer from "@/components/edit/EditDrawer";
import EditDrawerContainer from "@/components/edit/EditDrawerContainer";
import { routes, toHref } from "@/constants/routes/main.routes";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EditSectionsLinkButton from "@/components/edit/EditSectionsLinkButton";
import EditSectionsButton from "@/components/edit/EditSectionsButton";
import { studioClientAPI } from "@/features/studio/api/client.api";
import { selectProfile, setStudioProfile, setStudioProfilePermissions } from "@/features/studio/states/profile/page.slice";
import { selectTranslation } from "@/features/studio/states/translation/page.slice";

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
                <Typography variant="h2">
                    Перевод {translation.name}
                </Typography>
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
                        selected={section == "manga"}
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

    const { slug } = useParams<{slug: string}>()

    const [isNotFound, setIsNotFound] = useState(false)

    const fetchProfile = async (slug: string) => {
        try {
            const response = await studioClientAPI.getProfile(slug)

            if (!response.data.profile)
                return setIsNotFound(true)

            dispatch(setStudioProfile(response.data.profile))
            dispatch(setStudioProfilePermissions(response.data.profile_permission))
            setIsNotFound(false)
        } catch (e) {
            if (e instanceof ApiError) {
                return setIsNotFound(true)
            }

            throw e
        }
        
    }

    useEffect(() => {
        fetchProfile(slug)
    }, [slug])

    if (isNotFound) {
        notFound()
    }

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