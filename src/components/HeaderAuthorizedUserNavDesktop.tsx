"use client"

import { Avatar, Badge, Box, Button, IconButton, List, ListItemIcon, Menu, MenuItem } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import CreateListDialog from "./CreateListDialog";
import { clientFetch } from "@/lib/api/clientFetch";
import { setAuthUser } from "@/lib/state/features/auth_user/authUserSlice";


function ContentCreatingButton() {
    const [createContentMenuAnchorEl, setCreateContentMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenCreateContentMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCreateContentMenuAnchorEl(event.currentTarget);
    };

    const handleCloseCreateContentMenu = () => {
        setCreateContentMenuAnchorEl(null);
    };

    const createContentMenuOpen = Boolean(createContentMenuAnchorEl);

    // Dialog states
    const [listDialogOpen, setListDialogOpen] = useState(false);


    return (
        <>
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
                    onClick={() => setListDialogOpen(true)}
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
            <CreateListDialog open={listDialogOpen} onClose={() => setListDialogOpen(false)}/>
        </>
    )
}

function UserMenuButton() {
    const user = useAppSelector(state => state.authUser.user);

    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserMenuAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserMenuAnchorEl(null);
    };

    const userMenuOpen = Boolean(userMenuAnchorEl);

    const dispatch = useAppDispatch()

    const handleLogout = async() => {
        await clientFetch.post("/auth/logout");

        dispatch(setAuthUser(null))
    }

    if (!user)
        return null;

    return (
        <>
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
                    src={user.avatar}
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
                <Button
                    fullWidth
                    variant="text"
                    color="error"
                    onClick={handleLogout}
                > 
                    Выйти
                </Button>
            </Menu>
        </>
    )
}


export default function HeaderAuthorizedUserNavDesktop() {
    const notificationsCount = useAppSelector(state => state.authUser.user?.notifications_count);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "15px",
                alignItems: "center"
            }}
        >
            <ContentCreatingButton />
            <IconButton>
                <Badge
                    badgeContent={notificationsCount}
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
            <UserMenuButton />
        </Box>
    )
}