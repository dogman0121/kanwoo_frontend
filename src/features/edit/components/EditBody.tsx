import { Box } from "@mui/material";

export default function EditBody({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                flexGrow: 1
            }}
        >
            {children}
        </Box>
    )
}