"use client"

import { 
    Avatar, 
    Badge, 
    Box, 
    Button, 
    Divider, 
    IconButton, 
    ListItemIcon, 
    ListItemText, 
    Menu, 
    MenuItem, 
    Typography, 
    useTheme
} from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ManageAccountRoundedIcon from "@mui/icons-material/ManageAccountsRounded"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { useRouter } from "next/navigation";
import { routes, toHref } from "@/constants/routes/main.routes";
import Profile from "../../../../_components/userMenu/Profile";
import Logout from "../../mobile/components/Logout";
import ThemeSwitch from "../../../../_components/userMenu/ThemeSwitch";
import Link from "next/link";
import { selectAuthProfile, selectUnredNotificationsCount } from "@/features/global/states/auth-profile/auth-profile.slice";
import { setCreateCollectionDialogOpen } from "@/features/global/states/app/slice";


function ContentCreatingButton() {
    const dispatch =  useAppDispatch()
    const theme = useTheme()
    
    const [createContentMenuAnchorEl, setCreateContentMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenCreateContentMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCreateContentMenuAnchorEl(event.currentTarget);
    };

    const handleCloseCreateContentMenu = () => {
        setCreateContentMenuAnchorEl(null);
    };

    const createContentMenuOpen = Boolean(createContentMenuAnchorEl);

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddRoundedIcon />}
                onClick={handleOpenCreateContentMenu}
                sx={[theme.applyStyles("light", {
                    backgroundColor: "background.paper",
                    "&:hover": {
                        backgroundColor: theme.palette.grey[200]
                    }
                })]}
            >
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
            >
                <MenuItem
                    onClick={() => dispatch(setCreateCollectionDialogOpen(true))}
                >
                    <ListItemIcon>
                        <CollectionsBookmarkIcon/>
                    </ListItemIcon>
                    Коллекция
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <MenuBookRoundedIcon />
                    </ListItemIcon>
                    Тайтл
                </MenuItem>
            </Menu>
        </>
    )
}

function UserMenuButton() {
    const profile = useAppSelector(selectAuthProfile);

    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setProfileMenuAnchorEl(null);
    };

    const profileMenuOpen = Boolean(profileMenuAnchorEl);

    if (!profile)
        return null;

    return (
        <>
            <Box
                sx={{
                    mx: "10px"
                }}
            >
                <IconButton
                    sx={{
                        p: "0",
                    }}
                    onClick={handleOpenProfileMenu} 
                >
                    <Avatar
                        sx={{
                            cursor: "pointer"
                        }}
                        src={profile.avatar}
                    />
                </IconButton>
            </Box>
            <Menu 
                open={profileMenuOpen}
                onClose={handleCloseProfileMenu}
                anchorEl={profileMenuAnchorEl}
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
                        minWidth: "250px"
                    }
                }}
            >
                <Profile 
                    profile={profile}
                />
                <Divider sx={{my: 1}}/>
                <Link href={routes.notifications.index}>
                    <MenuItem>
                        <ListItemIcon>
                            <NotificationsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Уведомления
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Link href={routes.collections.index}>
                    <MenuItem>
                        <ListItemIcon><CollectionsBookmarkIcon /></ListItemIcon>
                        <ListItemText>Коллекции</ListItemText>
                    </MenuItem>
                </Link>
                <Link href={routes.history.index}>
                    <MenuItem>
                        <ListItemIcon>
                            <HistoryRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            История
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Link href={toHref(routes.studio.profiles.item, {slug: profile.slug})}>
                    <MenuItem>
                        <ListItemIcon>
                            <ManageAccountRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Творческая студия
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Divider sx={{my: 1}}/>
                <ThemeSwitch />
                <Link href={routes.settings.index}>
                    <MenuItem>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Настройки
                        </ListItemText>
                    </MenuItem>
                </Link>
                <MenuItem>
                    <ListItemIcon>
                        <SwitchAccountRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Сменить аккаунт
                    </ListItemText>
                    <ArrowForwardIosRoundedIcon 
                        sx={{
                            width: "20px",
                            height: "20px"
                        }}
                    />
                </MenuItem>
                <Divider sx={{my: 1}}/>
                <Logout />
            </Menu>
        </>
    )
}

function NotificationButton () {
    const notificationsCount = useAppSelector(selectUnredNotificationsCount);

    const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenNotificationsMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNotificationsMenuAnchorEl(event.currentTarget);
    };

    const handleCloseNotificationsMenu = () => {
        setNotificationsMenuAnchorEl(null);
    };

    const notificationsMenuOpen = Boolean(notificationsMenuAnchorEl);

    return (
        <>
            <IconButton
                onClick={handleOpenNotificationsMenu}
            >
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
            <Menu
                open={notificationsMenuOpen}
                onClose={handleCloseNotificationsMenu}
                anchorEl={notificationsMenuAnchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box
                    sx={{
                        px: "16px",
                        width: "300px"
                    }}
                >
                    <Typography>
                        Уведомления
                    </Typography>
                    <Typography 
                        textAlign={"center"}
                    >
                        Тут пока ничего нет!
                    </Typography>
                </Box>
            </Menu>
        </>
    )
}


export default function AuthorizedUserNav() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                alignItems: "center"
            }}
        >
            <ContentCreatingButton />
            <NotificationButton />
            <UserMenuButton />
        </Box>
    )
}