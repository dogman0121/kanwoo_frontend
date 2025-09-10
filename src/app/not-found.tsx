import {Box, Typography} from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "85vh",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                columnGap: "15px"
            }}
        >
            <Typography variant="h1" fontSize="56px">404</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography fontSize={"24px"}>Упс... Что-то не так!</Typography>
                <Typography fontSize={"20px"}>Страница не найдена</Typography>
            </Box>
        </Box>
    )
}