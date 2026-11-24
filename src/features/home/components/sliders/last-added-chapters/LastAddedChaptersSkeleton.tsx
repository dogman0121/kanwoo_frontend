import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function LastAddedChaptersSkeleton() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3
            }}
        >
            <Skeleton // aspect-ratio 2/3
                variant="rounded"
                width={"72px"}
                height={"108px"}
                
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography>
                    <Skeleton width={"100px"}/>
                </Typography>
                <Typography variant="caption">
                    <Skeleton width={"150px"}/>
                </Typography>
            </Box>
        </Box>
    )
}