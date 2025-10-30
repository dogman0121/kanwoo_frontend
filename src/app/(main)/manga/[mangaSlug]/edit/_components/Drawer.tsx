"use client"

import EditSections from "@/features/edit/EditSections"
import EditSectionsButton from "@/features/edit/EditSectionsButton"
import { useAppSelector } from "@/lib/state/hooks"
import { Box, Divider, List, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useState } from "react"
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Poster from "@/components/Poster"
import EditSectionsLinkButton from "@/features/edit/EditSectionsLinkButton"
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export default function NavDrawer() {
    const manga = useAppSelector(state => state.manga.manga)

    const profile = useAppSelector(state => state.authProfile.profile)

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    if (!manga)
        return null;

    if (!profile)
        return null;

    return (
        <EditSections>
            <Box 
                sx={{
                    height: "110px",
                    width: "100%"
                }}
            />
            <Box
                sx={{p: "10px 20px"}}
            >
                <List>
                    <EditSectionsLinkButton
                        link={`/manga/${manga.slug}/edit`}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <DashboardRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Главное"/>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton
                        link={`/manga/${manga.slug}/edit/info`}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <InfoOutlineRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Информация"/>
                    </EditSectionsLinkButton>
                </List>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%"
                }}
            >
                <Divider />
                <List
                    sx={{
                        p: "10px 20px"
                    }}
                >
                    <EditSectionsButton>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Настройки"/>
                    </EditSectionsButton>
                </List>
            </Box>
        </EditSections>
    )
}