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
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ManageAccountRoundedIcon from "@mui/icons-material/ManageAccountsRounded"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import CreateListDialog from "../../../components/CreateListDialog";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";


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
    const {mode, setMode} = useColorScheme()

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

    const dispatch = useAppDispatch()

    const handleLogout = async() => {
        await clientFetch.post("/auth/logout");

        dispatch(setAuthProfile(null))
    }

    const handleSwitchTheme = () => {
        if (mode == "system")
            setMode("light")
        else if (mode == "light")
            setMode("dark")
        else
            setMode("system")
    }

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
                <MenuItem
                    sx={{
                        gap: "15px"
                    }}
                >
                    <Avatar 
                        src={profile.avatar}
                        sx={{
                            width: "50px",
                            height: "50px"
                        }}
                    />
                    <Box>
                        <Typography variant="caption">Ваш профиль</Typography>
                        <Box>
                            <Typography fontWeight={600} fontSize={"16px"}>{profile.name}</Typography>
                            <Typography>@{profile.slug}</Typography>
                        </Box>
                        
                    </Box>
                </MenuItem>
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
                <MenuItem
                    onClick={handleSwitchTheme}
                >
                    <ListItemIcon>
                        <ContrastRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Тема
                    </ListItemText>
                    <Typography variant="caption">
                        {mode == "system" && "системная"}
                        {mode == "dark" && "темная"}
                        {mode == "light" && "светлая"}
                    </Typography>
                </MenuItem>
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
                <MenuItem
                    onClick={handleLogout}
                >
                    <ListItemIcon>
                        <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Выйти
                    </ListItemText>
                </MenuItem>
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