import WrappedText from "@/components/WrapperTypography";
import getPassedDateString from "@/features/comment/lib/getPassedDateString";
import { selectById } from "@/features/comment/states/comments/selectors";
import { useAppSelector } from "@/lib/state/hooks";
import { Avatar, Box, Typography } from "@mui/material";

export default function PreviewComment({
    commentId,
}: {commentId: number}) {
    const comment = useAppSelector(state => selectById(state, commentId))

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",

                gap: 3
            }}
        >
            <Avatar src={comment.data.creator.avatar}/>
            <Box>
                <WrappedText
                    lines={3}
                    sx={{
                        overflowWrap: "anywhere"
                    }}
                >
                    {comment.data.text}
                </WrappedText>
            </Box>
        </Box>
    )    
}