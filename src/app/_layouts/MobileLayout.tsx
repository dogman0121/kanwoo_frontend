"use client"

import { BottomNavigation, BottomNavigationAction, Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkBorder"
import { useState } from "react"
import theme from "@/theme";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import MobileMenu from "../(with-header-and-footer)/_components/MobileMenu";
import Footer from "./Footer";

export default function MobileLayout({children}: {children: React.ReactNode}) {
    const [value, setValue] = useState("");

    const [menuDrawerOpen, setMenuDrawerOpen] = useState(false)

    const router = useRouter()

    return (
        <>
            <Box
                sx={{
                    pb: "56px"
                }}
            >
                {children}
            </Box>
            <BottomNavigation
                showLabels
                sx={{ 
                    position: 'fixed', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    zIndex: 1000, 
                    px: theme.spacing(2),

                    ".MuiBottomNavigationAction-root": {
                        px: theme.spacing(2),
                        minWidth: "72px",
                        "&.Mui-selected": {
                            color: theme.typography.body1.color
                        },
                    },
                    ".MuiBottomNavigationAction-label.Mui-selected": {
                        color: theme.typography.body1.color,
                        fontSize: "13px"
                    }
                }}
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                }}  
            >
                <BottomNavigationAction 
                    label="Главная"
                    value={"main"}
                    disableRipple
                    onClick={() => router.push(ROUTES.HOME)}
                    icon={
                        <>
                            {value == "main" ?
                                <HomeIcon />
                                :
                                <HomeOutlinedIcon />
                            }
                        </>
                    }
                />
                <BottomNavigationAction 
                    label="Каталог"
                    value={"catalog"}
                    disableRipple
                    onClick={() => router.push(ROUTES.CATALOG)}
                    icon={
                        <SearchRoundedIcon />
                    } 
                />
                <BottomNavigationAction 
                    label="Списки" 
                    value={"lists"}
                    disableRipple
                    onClick={() => router.push(ROUTES.LISTS)}
                    icon={
                        <>
                            {value == "lists" ?
                                <BookmarkIcon />
                                :
                                <BookmarkOutlinedIcon />
                            }
                        </>
                    } 
                />
                <BottomNavigationAction 
                    label="История"
                    value={"history"} 
                    onClick={() => router.push(ROUTES.HISTORY)}
                    disableRipple
                    icon={
                        <HistoryRoundedIcon />
                    } 
                />
                <BottomNavigationAction 
                    label="Меню"
                    value={"menu"}
                    disableRipple
                    onClick={() => setMenuDrawerOpen(true)}
                    icon={
                        <MenuRoundedIcon />
                    } 
                />
            </BottomNavigation>
            <MobileMenu
                open={menuDrawerOpen}
                onClose={() => setMenuDrawerOpen(false)}
            />
        </>
    )
}