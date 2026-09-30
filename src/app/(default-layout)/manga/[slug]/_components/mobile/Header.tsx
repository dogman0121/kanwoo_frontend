"use client"

import { Box, IconButton } from "@mui/material"
import MobileOptions from "./MobileOptions"
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter()
    
    const [optionsOpen, setOptionsOpen] = useState(false)
    
    return (
        <>
            <Box
                sx={{
                    height: "34px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <IconButton
                    color="inherit"
                    onClick={() => router.back()}
                >
                    <WestRoundedIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    onClick={() => setOptionsOpen(true)}
                >
                    <MoreVertRoundedIcon />
                </IconButton>
            </Box>
            <MobileOptions 
                open={optionsOpen}
                onClose={() => setOptionsOpen(false)}
            />
        </>
    )
}