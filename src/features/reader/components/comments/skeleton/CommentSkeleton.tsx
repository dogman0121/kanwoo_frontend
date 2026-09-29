import { Box, Skeleton } from "@mui/material";
import AvatarSkeleton from "./AvatarSkeleton";

export default function CommentSkeleton() {
    return (
        <Box
            sx={{
                width: "100%",

                display: "flex",
                flexDirection: "row",
                gap: 3
            }}
        >
            <AvatarSkeleton />
            <Box
                sx={{
                    width: "100%"
                }}
            >
                <Skeleton variant="text" animation={false} width={"100px"}/>
                <Skeleton variant="text" animation={false}/>
            </Box>
        </Box>
    )
}