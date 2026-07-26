"use client"

import { Box, Typography } from "@mui/material";

export default async function Page() {

    
    return (
        <Box
            sx={{
                p: "10px"
            }}
        >
            <Typography variant="h1">Списки</Typography>
            <Typography
                mt={"15px"}
                textAlign={"center"}
            >
                В разработке!
            </Typography>
        </Box>
    )
}