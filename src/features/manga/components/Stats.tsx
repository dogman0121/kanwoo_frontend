import { Box, BoxProps, Skeleton, SvgIcon, Typography } from "@mui/material"
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import formatViews from "../utils/formatViews";

interface StatsProps {
    size: "medium" | "small",
    views: number,
    saves: number,
    boxProps?: BoxProps
}

export function StatsOption({
    icon,
    label,
    size = "medium",
    loading = false
}: {
    icon?: React.ReactElement,
    label?: string,
    size?: "small" | "medium",
    loading?: boolean
}) {


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            {icon && (
                <SvgIcon
                    sx={{
                        fontSize: size == "medium" ? "20px" : "18px",
                        color: "textSecondary"
                    }}
                >
                    {icon}
                </SvgIcon>
            )}
            <Typography
                color="textSecondary"
                variant={size == "medium" ? "body1" : "caption"}
                ml={0.6}
            >
                {loading ? <Skeleton width={"60px"} /> : label}
            </Typography>
        </Box>
    )
}

export default function Stats({
    size, 
    views, 
    saves, 
    boxProps = {}
}: StatsProps) {
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
                size={size}
                icon={<BookmarkBorderRoundedIcon />}
                label={`${saves} сохранений`}
            />
            <StatsOption 
                size={size}
                icon={<VisibilityOutlinedIcon />}
                label={`${formatViews(views)} просмотров`}
            />
        </Box>
    )
}