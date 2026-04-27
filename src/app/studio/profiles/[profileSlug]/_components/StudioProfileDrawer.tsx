"use client"

import EditDrawer from "@/features/edit/components/EditDrawer";
import EditSectionsButton from "@/features/edit/components/EditSectionsButton";
import { useAppSelector } from "@/lib/state/hooks";
import { Avatar, Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EditSectionsLinkButton from "@/features/edit/components/EditSectionsLinkButton";
import useSection from "../../../_hooks/useSection";
import { ROUTES } from "@/routes";

export default function StudioProfileDrawer() {
    const profile = useAppSelector(state => state.studioPageProfile.profile)

    const { section } = useSection()

    if (!profile) return

    return (
        <EditDrawer>
            <Box
                sx={{
                    p: "20px 15px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar
                        src={profile?.avatar} 
                        sx={{
                            width: "120px",
                            height: "120px",
                            mx: "auto"
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: "10px"
                        }}
                    >
                        <Typography fontWeight={600}>{profile.name}</Typography>
                        <Typography variant="caption">@{profile.slug}</Typography>
                    </Box>
                </Box>
                <Box>
                    <List>
                        <EditSectionsLinkButton 
                            link={ROUTES.STUDIO.PROFILE.MAIN(profile.slug)}
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
                            link={ROUTES.STUDIO.PROFILE.MANGA.MAIN(profile.slug)}
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
                            link={ROUTES.STUDIO.PROFILE.TRANSLATIONS(profile.slug)}
                            selected={section == "translations"}  
                        >
                            <ListItemIcon>
                                <TranslateRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Переводы
                            </ListItemText>
                        </EditSectionsLinkButton>
                        <EditSectionsLinkButton  
                            link={ROUTES.STUDIO.PROFILE.COLLECTIONS(profile.slug)}
                            selected={section == "collections"}
                        >
                            <ListItemIcon>
                                <CollectionsBookmarkRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Списки
                            </ListItemText>
                        </EditSectionsLinkButton>
                    </List>
                </Box>
            </Box>
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
                        px: "15px"
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