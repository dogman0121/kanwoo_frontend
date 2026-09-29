import { routes, toHref } from "@/constants/routes/main.routes"
import { Avatar, Box, Button, Divider, Icon, IconButton, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { useState } from "react"

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded"
import KeyboardArrrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import KeyboardArrrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import getPassedDateString from "../lib/getPassedDateString"
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useAppSelector } from "@/lib/state/hooks"
import { Comment } from "@/types/comment"
import { selectById } from "@/features/global/states/comments/selectors"

export default function CommentItem({
    commentId,
    onReply
}: {
    commentId: number,
    onReply?: (comment: Comment) => void
}){
    const [repliesOpen, setRepliesOpen] = useState(false)

    const comment = useAppSelector(state => selectById(state, commentId))

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: 2
            }}
        >
            <Avatar src={comment.creator?.avatar}/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Link href={toHref(routes.profiles.item, {slug: comment.creator.slug})}>
                        <Typography variant="caption" color="text.secondary">{comment.creator.name}</Typography>
                    </Link>
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        lineHeight={1}
                        ml={1}
                    >
                        {getPassedDateString(comment.created_at)}
                    </Typography>
                </Box>
                <Typography
                    color="text.primary"
                    sx={{
                        mt: 0.6
                    }}
                >
                    {comment.text}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                        mt: 0.4
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                columnGap: 0.6
                            }}
                        >
                            <IconButton size="small">
                                <KeyboardArrrowUpRoundedIcon />
                            </IconButton>
                            <Typography>0</Typography>
                            <IconButton size="small">
                                <KeyboardArrrowDownRoundedIcon />
                            </IconButton>
                        </Box>
                        {/* <Button
                            variant="text"
                            color="inherit"
                            onClick={() => setAnswerInputOpen((prev) => !prev)}
                        >
                            Ответить
                        </Button> */}
                        <Tooltip
                            title="Ответить"
                        >
                            <IconButton
                                size="small"
                                onClick={() => onReply?.(comment)}
                            >
                                <ReplyRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <IconButton
                        size="small"
                    >
                        <MoreHorizRoundedIcon />
                    </IconButton>
                </Box>
                {comment.answers_count > 0 && (
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => setRepliesOpen(state => !state)}
                    >
                        {repliesOpen ?
                            <>
                                <KeyboardArrrowUpRoundedIcon sx={{color: "text.secondary"}}/>
                                <Typography color="textSecondary" variant="caption">Скрыть ответы ({comment.answers_count})</Typography>
                            </>
                            :
                            <>
                                <KeyboardArrrowUpRoundedIcon  sx={{color: "text.secondary"}}/>
                                <Typography color="textSecondary" variant="caption">Показать ответы ({comment.answers_count})</Typography>
                            </>
                        }
                    </Button>
                )}
                
                {/* {answersOpen && (
                    <CommentsList 
                        commentsLength={answers.length}
                        hasMore={false}
                        onNext={() => {}}
                        sx={{
                            mt: 2
                        }}
                    >
                        {answers.map(ans =>(
                            <CommentItem />
                        ))}
                    </CommentsList>
                )} */}
            </Box>
        </Box>
    )
}