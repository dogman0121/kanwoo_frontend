import { Box, BoxProps, Typography } from "@mui/material"
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import formatViews from "../utils/formatViews";

interface StatsProps {
    size: "medium" | "small",
    views: number,
    saves: number
}

export default function Stats({size, views, saves, sx, ...props}: StatsProps & BoxProps) {
    return (
        <>
            {size == "medium" ?
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "15px",
                        ...sx
                    }}
                    {...props}
                >
                    <Typography 
                        variant="caption"
                        sx={{
                            fontSize: "14px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <BookmarkBorderRoundedIcon 
                            sx={{
                                fontSize: "22px",
                                mr: "3px"
                            }}
                        /> 
                        {saves} сохранений
                    </Typography>
                    <Typography 
                        variant="caption"
                        sx={{
                            fontSize: "14px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <VisibilityOutlinedIcon 
                            sx={{
                                fontSize: "22px",
                                mr: "3px"
                            }}
                        /> 
                        {formatViews(views)} просмотров
                    </Typography>
                </Box>
                :
                <Box
                    sx={{
                        mt: "5px",
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "15px"
                    }}
                >
                    <Typography 
                        variant="caption"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <BookmarkBorderRoundedIcon 
                            sx={{
                                width: "18px",
                                height: "18px",
                                mr: "3px"
                            }}
                        /> 
                        {saves} сохранений
                    </Typography>
                    <Typography 
                        variant="caption"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <VisibilityOutlinedIcon 
                            sx={{
                                width: "18px",
                                height: "18px",
                                mr: "3px"
                            }}
                        /> 
                        {formatViews(views)} просмотров
                    </Typography>
                </Box>
            }
        </>
    )
}