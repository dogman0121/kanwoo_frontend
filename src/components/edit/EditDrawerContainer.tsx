import { Box } from "@mui/material";
import { Children } from "react";

export default function EditDrawerContainer({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                px: 2,
                py: 1
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}