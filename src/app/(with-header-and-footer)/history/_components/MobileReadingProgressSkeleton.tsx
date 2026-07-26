import { Box, Skeleton, useTheme } from "@mui/material";
import PosterSkeleton from "@/components/PosterSkeleton";

export default function MobileReadingProgressSkeleton() {
    const theme = useTheme()

    return (
        <Box 
            sx={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    p: "0",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <PosterSkeleton
                    sx={{
                        borderRadius: "0"
                    }}
                />
                <Box
                    sx={{
                        py: theme.spacing(2),
                        bgcolor: "background.paper",
                        width: "100%",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Skeleton 
                        variant="text"
                        width={"80px"}
                    />
                </Box>
            </Box>
        </Box>
    )
}