import { Box, Typography } from "@mui/material";

export default function NoComments() {
    return (
        <Box
            sx={{
                py: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Typography fontSize={"14px"} color="text.secondary">
                Комментариев нет
            </Typography>
        </Box>
    )
}