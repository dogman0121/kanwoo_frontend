"use client"

import Poster from "@/components/Poster";
import EditSectionsDrawer from "@/features/edit/components/EditDrawer";
import EditSectionsLinkButton from "@/features/edit/components/EditSectionsLinkButton";
import { Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import useSection from "../../../_hooks/useSection";
import EditSectionsButton from "@/features/edit/components/EditSectionsButton";
import { useAppSelector } from "@/lib/state/hooks";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useState } from "react";
import StudioTranslationSettings from "./StudioTranslationSettings";

export default function StudioTranslationDrawer() {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const { section } = useSection()

    const translation = useAppSelector(state => state.studioPageTranslation.translation)

    return (
        <>
            <EditSectionsDrawer>
                <Box
                    sx={{
                        p: "20px 15px"
                    }}
                >
                    {translation?.is_official ? (
                        <EditSectionsLinkButton link={`/studio/manga/${translation?.manga?.slug}`}>
                            <ListItemIcon>
                                <ArrowBackRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>К тайтлу</ListItemText>
                        </EditSectionsLinkButton>
                    ) : (
                        <EditSectionsLinkButton link={`/studio/profile/${translation?.creator.slug}`}>
                            <ListItemIcon>
                                <ArrowBackRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>В профиль</ListItemText>
                        </EditSectionsLinkButton>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: "10px"
                        }}
                    >
                        <Poster
                            src={translation?.manga?.poster?.medium || ""} 
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
                            <Typography fontWeight={600}>{translation?.name}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <List>
                            <EditSectionsLinkButton 
                                link={`/studio/translation/${translation?.id}`}
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
                                link={`/studio/translation/${translation?.id}/chapters`}
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
            </EditSectionsDrawer>
            <StudioTranslationSettings 
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
        
    )
}