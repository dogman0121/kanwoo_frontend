import { Box, Divider, Typography } from "@mui/material";

export default function AuthOr() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                py: 3,
                px: 4
            }}
        >
            <Divider 
                sx={{
                    width: "30%"
                }}
            />
            <Typography>или</Typography>
            <Divider 
                sx={{
                    width: "30%"
                }}
            />
        </Box>
    )
}