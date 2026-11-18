"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Avatar, Box, Button, Divider, Drawer, DrawerProps, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, PaperProps, styled, Typography, useTheme } from "@mui/material";
import SettignsRoundedIcon from "@mui/icons-material/SettingsRounded"
import Logout from "./Logout";
import ThemeSwitch from "../../../../_components/userMenu/ThemeSwitch";
import { selectAuthProfile } from "@/features/auth/states/auth-profile";
import { setAuthModalOpen } from "@/features/global/states/app/slice";
import Link from "next/link";
import { routes, toHref } from "@/constants/routes/main.routes";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ManageAccountRoundedIcon from "@mui/icons-material/ManageAccountsRounded"

const MobileMenuNav = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "end",
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
}))

const ProfileWidget = () => {
    const authProfile = useAppSelector(selectAuthProfile)

    if (!authProfile) return

    return (
        <Box
            sx={{
                pb: 1
            }}
        >
            <ListItemButton
                LinkComponent={Link}
                href={toHref(routes.profiles.item, {slug: authProfile.slug})}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3
                    }}
                >
                    <Avatar src={authProfile.avatar}/>
                    <Box>
                        <Typography variant="caption" color="textSecondary">Ваш профиль</Typography>
                        <Typography variant="h3">{authProfile.name}</Typography>
                    </Box>
                </Box>
            </ListItemButton>
        </Box>
    )
}

function AnonymusMobileMenu() {
    const dispatch = useAppDispatch()

    const handleOpenAuth = () => {
        dispatch(setAuthModalOpen(true))
    }

    return (
        <>
            <MobileMenuNav>
                <IconButton>
                    <SettignsRoundedIcon />
                </IconButton>
            </MobileMenuNav>
            <ListItemButton>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleOpenAuth}
                >
                    Войдите или зарегисрируйтесь
                </Button>
            </ListItemButton>
            <MenuList>
                <ThemeSwitch />
            </MenuList>
        </>
    )
}

const MyDivider = styled(Divider)(({theme}) => ({
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
}))

function AuthorizedMobileMenu() {
    return (
        <>
            <MobileMenuNav>
                <IconButton>
                    <SettignsRoundedIcon />
                </IconButton>
            </MobileMenuNav>
            <Box
            >
                <ProfileWidget />
                <MyDivider />
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <NotificationsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>Уведомления</ListItemText>
                    </MenuItem>
                </MenuList>
                <MyDivider />
                <MenuList>
                    <ThemeSwitch />
                    <MenuItem>
                        <ListItemIcon>
                            <SettignsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Настройки
                        </ListItemText>
                    </MenuItem>
                </MenuList>
                <MyDivider />
                <MenuList>
                    <Logout />
                </MenuList>
            </Box>
        </>
    )
} 

export default function MobileMenu({...props}: DrawerProps) {
    const authProfile = useAppSelector(selectAuthProfile)

    return (
        <Drawer
            {...props}
            anchor="right"
            sx={{
                "& > .MuiPaper-root": {
                    width: "80%",
                }
            }}
        >
            {authProfile ?
                <AuthorizedMobileMenu />
                :
                <AnonymusMobileMenu />
            }
        </Drawer>
    )
}