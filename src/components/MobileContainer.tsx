import { Box, BoxProps } from "@mui/material";

export default function MobileContainer({
    sx,
    ...props
}: BoxProps) {
    return (
        <Box
            sx={{
                px: 2,
                pb: 2,
                ...sx,
            }}
            {...props}
        />
    )
}