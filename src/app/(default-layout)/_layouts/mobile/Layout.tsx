"use client"

import { BottomNavigation, BottomNavigationAction, Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkBorder"
import { useState } from "react"
import theme from "@/constants/themes/main.theme";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes/main.routes";
import MobileMenu from "./components/MobileMenu";

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

                    boxShadow: "0 0 10px rgb(126 115 115 / 20%)",

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
                    onClick={() => router.push(routes.index)}
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
                    onClick={() => router.push(routes.catalog.index)}
                    icon={
                        <SearchRoundedIcon />
                    } 
                />
                <BottomNavigationAction 
                    label="Списки" 
                    value={"lists"}
                    disableRipple
                    onClick={() => router.push(routes.collections.index)}
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
                    onClick={() => router.push(routes.history.index)}
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