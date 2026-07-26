import { ROUTES } from "@/routes"
import Comment from "@/types/comment/comment"
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded"
import KeyboardArrrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import KeyboardArrrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import CommentInput from "./CommentInput"
import CommentsList from "./CommentsList"
import { clientFetch } from "@/lib/fetch/clientFetch"
import getPassedDateString from "../lib/getPassedDateString"


export default function CommentItem({
    comment
}: {
    comment: Comment
}){

    const [answerInputOpen, setAnswerInputOpen] = useState(false)
    const [answersOpen, setAnswersOpen] = useState(false)
    const [answers, setAnswers] = useState<Comment[]>([])

    const handleAnswer = async (text: string) => {
        const response = await clientFetch.post<Comment>("/comments", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                parent: comment.id,
                text: text
            })
        })

        comment.answers_count += 1
        setAnswers([response.data, ...answers])
        setAnswersOpen(true)
    }

    const handleLoadComments = async () => {
        const response = await clientFetch.get<Comment[]>(`/comments/${comment.id}/answers`)

        setAnswers(prev => [...prev, ...response.data])
    }

    useEffect(() => {
        if (answersOpen && answers.length < comment.answers_count){
            handleLoadComments()
        }
    }, [answersOpen])

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
                        alignItems: "center",
                        columnGap: 2
                    }}
                >
                    <Link href={ROUTES.PROFILE.MAIN(comment.creator.slug)}>
                        <Typography fontWeight={600}>{comment.creator.name}</Typography>
                    </Link>
                    <Typography variant="caption">{getPassedDateString(comment.created_at)}</Typography>
                </Box>
                <Typography
                    sx={{
                        mt: 0.4
                    }}
                >
                    {comment.text}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: 1
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
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() => setAnswerInputOpen((prev) => !prev)}
                    >
                        Ответить
                    </Button>
                    {/* <Tooltip
                        title="Ответить"
                    >
                        <IconButton
                            size="small"
                        >
                            <ReplyRoundedIcon />
                        </IconButton>
                    </Tooltip> */}
                    {comment.answers_count > 0 && (
                        <Button 
                            variant="text"
                            color="inherit"
                            endIcon={
                                answersOpen ? 
                                <KeyboardArrrowUpRoundedIcon />
                                :
                                <KeyboardArrrowDownRoundedIcon />
                            }
                            onClick={() => setAnswersOpen(prev => !prev)}
                            sx={{
                                textTransform: "uppercase"
                            }}
                        >
                            Смотреть ответы ({comment.answers_count})
                        </Button>
                    )}
                </Box>
                {answerInputOpen && (
                    <CommentInput 
                        onSend={handleAnswer}
                        sx={{
                            mt: 1
                        }}
                    />
                )}
                {answersOpen && (
                    <CommentsList 
                        comments={answers}
                        hasMore={false}
                        onNext={() => {}}
                        sx={{
                            mt: 2
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}