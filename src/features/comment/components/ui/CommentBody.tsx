import { Profile } from "@/features/profile/types/profile.type";
import { Box, Link, Typography } from "@mui/material";
import CommentDatePassed from "./CommentDatePassed";

export interface CommentBodyProps {
    text: string,
    creator: Profile,
    created_at: string,
    replyTo?: Profile,
    disableReplyTo?: boolean
}

export function CommentCreatorName({name}: {name: string}) {
    return (
        <Typography variant="caption" fontWeight={600}>
            {name}
        </Typography>
    )
}

export function CommentText({
    text,
    replyTo,
    disableReplyTo = false
}: {
    text: string,
    replyTo?: Profile,
    disableReplyTo?: boolean
}) {
    return (
        <Typography 
            mt={0.4}
        >
            {replyTo && !disableReplyTo && (
                <Link href="" sx={{mr: 1}}>
                    @{replyTo.name}
                </Link>
            )}
            {text}
        </Typography>
    )
}

export default function CommentBody({
    text,
    replyTo,
    creator,
    created_at,
    disableReplyTo = false
}: CommentBodyProps) {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row"
                }}
            >
                <CommentCreatorName name={creator.name}/>
                <CommentDatePassed date={created_at}/>
            </Box>
            <CommentText text={text} replyTo={replyTo} disableReplyTo={disableReplyTo}/>
        </Box>
    )
}