"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Drawer, DrawerProps, IconButton, List, ListItem, Menu, Paper, styled, useTheme } from "@mui/material";
import SettignsRoundedIcon from "@mui/icons-material/SettingsRounded"
import Logout from "./Logout";
import ThemeSwitch from "../../../../_components/userMenu/ThemeSwitch";
import { selectAuthProfile } from "@/features/global/states/auth-profile";
import { setAuthModalOpen } from "@/features/global/states/app/slice";

const MobileMenuNav = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: "16px",
    paddingRight: "16px"
}))

const MobileMenuList = styled(List)({
})

const ProfileWidget = () => {
    const authProfile = useAppSelector(selectAuthProfile)

    return (
        <Paper>
            
        </Paper>
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
            <ListItem>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleOpenAuth}
                >
                    Войдите или зарегисрируйтесь
                </Button>
            </ListItem>
            <MobileMenuList>
                <ThemeSwitch />
            </MobileMenuList>
        </>
    )
}

function AuthorizedMobileMenu() {
    return (
        <Box>
            <MobileMenuNav>
                <IconButton>
                    <SettignsRoundedIcon />
                </IconButton>
            </MobileMenuNav>
            <ProfileWidget />
            <MobileMenuList>
                <ThemeSwitch />
                <Logout />
            </MobileMenuList>
        </Box>
    )
} 

export default function MobileMenu({...props}: DrawerProps) {
    const authProfile = useAppSelector(selectAuthProfile)

    return (
        <Drawer
            {...props}
            anchor="right"
            sx={{
                "& .MuiPaper-root": {
                    width: "80%"
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