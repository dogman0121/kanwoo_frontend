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
    useColorScheme, 
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
import { useAppSelector } from "@/lib/state/hooks";
import CreateListDialog from "../../../components/CreateListDialog";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import Profile from "./userMenu/Profile";
import Logout from "./userMenu/Logout";
import ThemeSwitch from "./userMenu/ThemeSwitch";


function ContentCreatingButton() {
    const theme = useTheme()
    
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
                    onClick={() => setListDialogOpen(true)}
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
            <CreateListDialog open={listDialogOpen} onClose={() => setListDialogOpen(false)}/>
        </>
    )
}

function UserMenuButton() {
    const router = useRouter()

    const profile = useAppSelector(state => state.authProfile.profile);

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
                <MenuItem
                    onClick={() => {
                        router.push(ROUTES.NOTIFICATIONS)
                    }}
                >
                    <ListItemIcon>
                        <NotificationsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Уведомления
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        router.push(ROUTES.HISTORY)
                    }}
                >
                    <ListItemIcon>
                        <HistoryRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        История
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        router.push(ROUTES.STUDIO.PROFILE.MAIN(profile.slug))
                    }}
                >
                    <ListItemIcon>
                        <ManageAccountRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Творческая студия
                    </ListItemText>
                </MenuItem>
                <Divider sx={{my: 1}}/>
                <ThemeSwitch />
                <MenuItem>
                    <ListItemIcon>
                        <SettingsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Настройки
                    </ListItemText>
                </MenuItem>
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
    const notificationsCount = useAppSelector(state => state.authProfile.profile?.notifications_count);

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
                        px: "16px"
                    }}
                >
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