import WrappedText from "@/components/WrapperTypography";
import getPassedDateString from "@/features/comment/lib/getPassedDateString";
import { selectById } from "@/features/global/states/comments/comments/selectors";
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
            <Avatar src={comment.creator.avatar}/>
            <Box>
                <Typography
                    variant="caption"
                    color="textSecondary"
                >
                    {comment.creator.name}
                </Typography>
                <WrappedText
                    lines={3}
                >
                    {comment.text}
                </WrappedText>
            </Box>
        </Box>
    )    
}