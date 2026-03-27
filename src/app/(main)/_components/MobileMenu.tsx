"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Divider, Drawer, DrawerProps, IconButton, List, ListItem, Menu, styled, useTheme } from "@mui/material";
import Profile from "./userMenu/Profile";
import SettignsRoundedIcon from "@mui/icons-material/SettingsRounded"
import Logout from "./userMenu/Logout";
import { useState } from "react";
import AuthModal from "@/features/auth/components/AuthModal";

const MobileMenuItem = styled(ListItem)({
    paddingLeft: 0,
    paddingRight: 0
})

const MobileMenuNav = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: "16px",
    paddingRight: "16px"
}))

const MobileMenuList = styled(List)({
    padding: 0
})

export default function MobileMenu({...props}: DrawerProps) {
    const authProfile = useAppSelector(state => state.authProfile.profile)

    const [authModalOpen, setAuthModalOpen] = useState(false)

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
            <>
                {authProfile ?
                    <Box>
                        <MobileMenuNav>
                            <IconButton>
                                <SettignsRoundedIcon />
                            </IconButton>
                        </MobileMenuNav>
                        <MobileMenuList>
                            <Profile profile={authProfile}/>
                            <Logout />
                        </MobileMenuList>
                    </Box>
                    :
                    <>
                        <MobileMenuNav>
                            <IconButton>
                                <SettignsRoundedIcon />
                            </IconButton>
                        </MobileMenuNav>
                        <MobileMenuList>
                            <ListItem>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => setAuthModalOpen(true)}
                                >
                                    Войдите или зарегисрируйтесь
                                </Button>
                            </ListItem>
                        </MobileMenuList>
                        <AuthModal 
                            open={authModalOpen}
                            onClose={() => setAuthModalOpen(false)}
                        />
                    </>
                }
            </>
        </Drawer>
    )
}