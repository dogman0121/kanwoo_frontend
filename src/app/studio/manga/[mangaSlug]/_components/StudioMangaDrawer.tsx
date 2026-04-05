"use client"

import EditDrawer from "@/features/edit/components/EditDrawer";
import EditSectionsButton from "@/features/edit/components/EditSectionsButton";
import { useAppSelector } from "@/lib/state/hooks";
import { Avatar, Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import EditSectionsLinkButton from "@/features/edit/components/EditSectionsLinkButton";
import useSection from "../../../_hooks/useSection";
import Poster from "@/components/Poster";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StudioMangaSettings from "./StudioMangaSettings";


export default function StudioMangaDrawer() {
    const profile = useAppSelector(state => state.authProfile.profile)
    const manga = useAppSelector(state => state.studioPageManga.manga)

    const { section } = useSection()

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    if (!manga) return ;

    return (
        <>
            <EditDrawer>
                <Box
                    sx={{
                        p: "20px 15px"
                    }}
                >
                    <EditSectionsLinkButton link={`/studio/profile/${profile?.slug}`}>
                        <ListItemIcon>
                            <ArrowBackRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>В профиль</ListItemText>
                    </EditSectionsLinkButton>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: "10px"
                        }}
                    >
                        <Poster
                            src={manga.poster?.medium} 
                            width="140px"
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mt: "10px"
                            }}
                        >
                            <Typography fontWeight={600}>{manga.name}</Typography>
                            <Typography variant="caption">@{manga.slug}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <List>
                            <EditSectionsLinkButton 
                                link={`/studio/manga/${manga.slug}`}
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
                                link={`/studio/manga/${manga?.slug}/translations`}
                                selected={section == "translations"}
                            >
                                <ListItemIcon>
                                    <LibraryBooksRoundedIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Главы
                                </ListItemText>
                            </EditSectionsLinkButton>
                            <EditSectionsLinkButton  
                                link={`/studio/manga/${manga.slug}/comments`}
                                selected={section == "comments"}  
                            >
                                <ListItemIcon>
                                    <TranslateRoundedIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Комментарии
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
                        <EditSectionsButton
                            onClick={() => setSettingsOpen(true)}
                        >
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
            <StudioMangaSettings 
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
    )
}