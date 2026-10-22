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
                <Typography
                    variant="caption"
                    color="textSecondary"
                >
                    {comment.data.creator.name}
                </Typography>
                <WrappedText
                    lines={3}
                >
                    {comment.data.text}
                </WrappedText>
            </Box>
        </Box>
    )    
}