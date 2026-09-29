import { range } from "lodash";
import CommentSkeleton from "./CommentSkeleton";
import { Box } from "@mui/material";

export default function CommentSkeletonList() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",

                gap: 2,
            }}
        >
            {range(0, 3).map(ind => (
                <CommentSkeleton key={`comments_preview_skeleton_${ind}`}/>
            ))}
        </Box>
    )
}