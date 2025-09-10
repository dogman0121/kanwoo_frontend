"use client"

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from "react"
import Link from "next/link";

export default function MobileLayout({children}: {children: React.ReactNode}) {
    const [value, setValue] = useState(0);
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
                sx={{ 
                    position: 'fixed', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    zIndex: 1000, 
                    boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)" 
                }}
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                }}  
            >
                <BottomNavigationAction color="primary" icon={<Link href={"/"}><HomeRoundedIcon /></Link>}/>
                <BottomNavigationAction color="primary" icon={<Link href={"/catalog"}><SearchRoundedIcon /></Link>} />
                <BottomNavigationAction color="primary" icon={<Link href={"/notifications"}><NotificationsRoundedIcon /></Link>} />
                <BottomNavigationAction color="primary"icon={<MenuRoundedIcon />} />
            </BottomNavigation>
        </>
    )
}