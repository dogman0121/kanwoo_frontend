import { Box, BoxProps } from "@mui/material";

export default function MobileContainer({
    sx,
    ...props
}: BoxProps) {
    return (
        <Box
            sx={{
                p: 2,
                ...sx,
            }}
            {...props}
        />
    )
}