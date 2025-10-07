"use client"

import theme from "@/theme";
import Team from "@/types/team"
import { Avatar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography } from "@mui/material"
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppSelector, useAppStore } from "@/lib/state/hooks";
import { setTeam } from "@/lib/state/features/team/teamSlice";

const drawerWidth = 260;

const MyListItemButton = styled(ListItemButton)(({theme}) =>({
    borderRadius: "12px",
    "&.Mui-selected": {
        backgroundColor: theme.vars?.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.vars?.palette.secondary.main
        }
    }
}))

export default function SectionsDrawer({team}: {team: Team}) {
    const store = useAppStore()

    const currTeam = useAppSelector(state => state.team.team)

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        store.dispatch(setTeam(team))
    }, [team])

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { 
                        width: drawerWidth, 
                        boxSizing: 'border-box',
                        bgcolor: theme.vars?.palette.background.default,
                    },
                }}
            >
                <Toolbar />
                <Box
                    sx={{
                        p: "20px" 
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
                            src={currTeam?.avatar} 
                            sx={{
                                width: "120px",
                                height: "120px",
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mt: "15px"
                            }}
                        >
                            {currTeam?.name}
                        </Typography>
                        <Typography variant="caption">@{currTeam?.slug}</Typography>
                    </Box>
                    <List
                        sx={{
                            mt: "10px"
                        }}
                    >
                        <Link href={`/teams/${team.slug}/edit`}>
                            <MyListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                    <DashboardRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Главное"/>
                            </MyListItemButton>
                        </Link>
                        <Link href={`/teams/${team.slug}/edit/info`}>
                            <MyListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1)}
                            >
                                <ListItemIcon>
                                    <InfoOutlineRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Информация"/>
                            </MyListItemButton>
                        </Link>
                        <Link href={`/teams/${team.slug}/edit/translations`}>
                            <MyListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}
                            >
                                <ListItemIcon>
                                    <TranslateRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Переводы"/>
                            </MyListItemButton>
                        </Link>
                        <Link href={`/teams/${team.slug}/edit/members`}>
                            <MyListItemButton
                                selected={selectedIndex === 3}
                                onClick={(event) => handleListItemClick(event, 3)}
                            >
                                <ListItemIcon>
                                    <PeopleRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Участники"/>
                            </MyListItemButton>
                        </Link>
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
                        <MyListItemButton>
                            <ListItemIcon>
                                <SettingsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Настройки"/>
                        </MyListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}