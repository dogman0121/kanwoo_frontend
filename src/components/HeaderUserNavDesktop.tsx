"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { Avatar, Badge, Box, Button, IconButton, List, ListItemIcon, Menu, MenuItem } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useState } from "react";
import HeaderAnonymusNavDesktop from "./HeaderAnonymusNavDesktop";

export default function HeaderUserNavDesktop() {
    const authUser = useAppSelector(state => state.authUser.user)

    const [createContentMenuAnchorEl, setCreateContentMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenCreateContentMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCreateContentMenuAnchorEl(event.currentTarget);
    };

    const handleCloseCreateContentMenu = () => {
        setCreateContentMenuAnchorEl(null);
    };

    const createContentMenuOpen = Boolean(createContentMenuAnchorEl);


    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserMenuAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserMenuAnchorEl(null);
    };

    const userMenuOpen = Boolean(userMenuAnchorEl);

    return (
        <>
            {authUser?.id == undefined && (
                <Box
                    sx={{
                        width: "40px",
                        height: "40px",
                        bgcolor: "var(mui-palette-background-paper)"
                    }}
                ></Box>
            )}
            {authUser == null && (
                <HeaderAnonymusNavDesktop />
            )}
            {authUser && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "15px",
                        alignItems: "center"
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleOpenCreateContentMenu}
                        sx={(theme) => ({
                            bgcolor: theme.vars?.palette.secondary.main,
                            color: theme.typography.body1.color
                        })}
                    >
                        <AddRoundedIcon 
                            sx={{
                                mr: "3px"
                            }}
                        />
                        Добавить
                    </Button>
                    <Menu 
                        open={createContentMenuOpen}
                        onClose={handleCloseCreateContentMenu}
                        anchorEl={createContentMenuAnchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            "& .MuiPopover-paper": {
                                borderRadius: "12px",
                                mt: "5px"
                            }
                        }}
                    >
                        <MenuItem
                        >
                            <ListItemIcon>
                                <CollectionsBookmarkIcon/>
                            </ListItemIcon>
                            Коллекция
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <PeopleAltRoundedIcon/>
                            </ListItemIcon>
                            Команда
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <MenuBookRoundedIcon />
                            </ListItemIcon>
                            Тайтл
                        </MenuItem>
                    </Menu>
                    <IconButton>
                        <Badge
                            badgeContent={5}
                            color="error"
                            sx={{
                                "&:hover .MuiBadge-badge": {
                                    opacity: 0,
                                    transition: "0.2s ease-in"
                                }
                            }}

                        >
                            <NotificationsIcon 
                                sx={{
                                    width: "22px",
                                    height: "22px"
                                }}
                            />
                        </Badge>
                    </IconButton>
                    <IconButton
                        sx={{
                            p: "0"
                        }}
                        onClick={handleOpenUserMenu} 
                    >
                        <Avatar
                            sx={{
                                cursor: "pointer"
                            }}
                            src={authUser.avatar}
                        />
                    </IconButton>
                    <Menu 
                        open={userMenuOpen}
                        onClose={handleCloseUserMenu}
                        anchorEl={userMenuAnchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            "& .MuiPopover-paper": {
                                borderRadius: "12px",
                                mt: "5px"
                            }
                        }}
                    >
                        <MenuItem
                            sx={{
                                display: "flex",
                                columnGap: "10px"
                            }}
                        >
                            <CollectionsBookmarkIcon
                            /> Коллекция
                        </MenuItem>
                        <MenuItem
                            sx={{
                                display: "flex",
                                columnGap: "10px"
                            }}
                        >
                            <PeopleAltRoundedIcon
                            /> Команда
                        </MenuItem>
                        <MenuItem
                            sx={{
                                display: "flex",
                                columnGap: "10px"
                            }}
                        >
                            <MenuBookRoundedIcon /> Тайтл
                        </MenuItem>
                    </Menu>
                </Box>
            )}
        </>
    )
}