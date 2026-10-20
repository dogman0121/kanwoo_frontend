"use client"

import { Avatar, Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/state/hooks";
import useSection from "@/features/studio/hooks/useSection";
import EditDrawer from "@/components/edit/EditDrawer";
import EditDrawerContainer from "@/components/edit/EditDrawerContainer";
import { routes, toHref } from "@/constants/routes/main.routes";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EditSectionsLinkButton from "@/components/edit/EditSectionsLinkButton";
import EditSectionsButton from "@/components/edit/EditSectionsButton";
import { selectProfile } from "@/features/studio/states/profile/page.slice";


export default function StudioDrawer() {
    const profile = useAppSelector(selectProfile)

    const { section } = useSection()

    if (!profile) return

    return (
        <EditDrawer>
            <EditDrawerContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar 
                        src={profile.avatar}
                        sx= {{
                            width: "96px",
                            height: "96px"
                        }}
                    />
                    <Box
                        sx={{
                            mt: 2,
                            textAlign: "center"
                        }}
                    >
                        <Typography>{profile.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            @{profile.slug}
                        </Typography>
                    </Box>
                </Box>
                <List>
                    <EditSectionsLinkButton 
                        link={toHref(routes.studio.profiles.item, {slug: profile.slug})}
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
                        link={toHref(routes.studio.profiles.manga, {slug: profile.slug})}
                        selected={section == "manga"}
                    >
                        <ListItemIcon>
                            <LibraryBooksRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Тайтлы
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton  
                        link={toHref(routes.studio.profiles.translations, {slug: profile.slug})}
                        selected={section == "translations"}  
                    >
                        <ListItemIcon>
                            <TranslateRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Переводы
                        </ListItemText>
                    </EditSectionsLinkButton>
                    {/* <EditSectionsLinkButton  
                        link={toHref(routes.studio.profiles.collections, {slug: profile.slug})}
                        selected={section == "collections"}
                    >
                        <ListItemIcon>
                            <CollectionsBookmarkRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Списки
                        </ListItemText>
                    </EditSectionsLinkButton> */}
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