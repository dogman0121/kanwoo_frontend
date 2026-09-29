import { Box } from "@mui/material";
import { Children } from "react";

export default function CommentsList({
    children
}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",

                gap: 2,
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}