"use client"

import EditSectionsDrawer from "@/features/edit/components/EditDrawer";
import EditSectionsLinkButton from "@/features/edit/components/EditSectionsLinkButton";
import { Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Poster from "@/components/Poster";
import useSection from "../../../_hooks/useSection";
import EditSectionsButton from "@/features/edit/components/EditSectionsButton";
import { useAppSelector } from "@/lib/state/hooks";
import { useState } from "react";
import StudioChapterSettings from "./StudioChapterSettings";
import { ROUTES } from "@/routes";

export default function StudioChapterDrawer() {
    const { section } = useSection()

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const chapter = useAppSelector(state => state.studioPageChapter.chapter)

    if (!chapter) return;

    return (
        <>
            <EditSectionsDrawer>
                <Box
                    sx={{
                        p: "20px 15px"
                    }}
                >
                    {chapter.translation && (
                        <EditSectionsLinkButton link={ROUTES.STUDIO.TRANSLATION.MAIN(chapter.translation.id)}>
                            <ListItemIcon>
                                <ArrowBackRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>К переводу</ListItemText>
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
                            src={chapter?.manga?.poster?.medium} 
                            width="140px"
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mt: "10px",
                                textAlign: "center"
                            }}
                        >
                            <Typography fontWeight={600}>{chapter?.name}</Typography>
                            <Typography variant="caption">Глава {chapter?.chapter}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <List>
                            <EditSectionsLinkButton 
                                link={`/studio/translation/${chapter?.id}`}
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
            <StudioChapterSettings 
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
    )
}