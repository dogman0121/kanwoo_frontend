import { Box } from "@mui/material";
import { SxProps } from "@mui/system";

export default function ActionsContainer ({children, sx}: {children: React.ReactNode, sx?: SxProps}) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                ...sx
            }}
        >
            {children}
        </Box>
    )
}