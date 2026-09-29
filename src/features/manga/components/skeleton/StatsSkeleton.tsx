import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, BoxProps } from '@mui/material';
import { StatsOption } from '../Stats';

export default function StatsSkeleton ({
    size = "medium",
    boxProps = {}
}: {
    size?: "medium" | "small",
    boxProps?: BoxProps
}){
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "15px",
                ...boxProps.sx
            }}
            {...boxProps}
        >
            <StatsOption 
                icon={<BookmarkBorderRoundedIcon />}
                size={size}
                loading
            />
            <StatsOption 
                icon={<VisibilityOutlinedIcon />}
                size={size}
                loading
            />
        </Box>
    )
}