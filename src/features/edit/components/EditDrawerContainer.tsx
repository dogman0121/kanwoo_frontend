import { Box } from "@mui/material";
import { Children } from "react";

export default function EditDrawerContainer({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                p: "20px 15px"
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}