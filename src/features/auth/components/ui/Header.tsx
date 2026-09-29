import { Box, Typography } from "@mui/material"

interface HeaderProps {
    startAdornment?: React.ReactElement,
    label: string
}

export default function Header({
    startAdornment,
    label
}: HeaderProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center"
            }}
        >
            {/* <IconButton onClick={() => setCreateProfileOpen(false)}>
                <ArrowBackRoundedIcon />
            </IconButton> */}
            {startAdornment}
            <Typography variant="h2">{label}</Typography>
        </Box>
    )
}