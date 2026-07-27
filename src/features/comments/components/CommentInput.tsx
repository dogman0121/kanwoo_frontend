"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { Box, BoxProps, Button, FormControl, FormControlProps, InputBase, Paper, Typography } from "@mui/material"
import { useState } from "react"
import SendRoundedIcon from "@mui/icons-material/SendRounded"
import AuthModal from "@/features/auth/components/AuthModal"
import theme from "@/theme"

export function CommentAuthorizedInput({
    onSend,
    sx,
    ...props
}: FormControlProps & {
    onSend?: (text: string) => void
}  ) {

    const maxCommentLength = 1000;

    const [commentText, setCommentText] = useState("");

    const [error, setError] = useState(false)

    return (
        <FormControl
            fullWidth
            sx={{
                ...sx
            }}
            {...props}
        >
            <Box
                sx={{
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",

                    py: 2,
                    pl: 2,
                    pr: 1,
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 1
                }}
            >
                <InputBase 
                    fullWidth
                    multiline
                    value={commentText}
                    onChange={(event) => {
                        const text = event.target.value;

                        if (text.length > maxCommentLength) {
                            setError(true)
                        } else {
                            setError(false)
                        }
                        setCommentText(event.target.value)
                    }}
                    placeholder="Введите текст комментария"
                    
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        columnGap: 2,
                    }}
                >
                    <Typography
                        
                    >
                        {commentText.length} / {maxCommentLength}
                    </Typography>
                    <Button
                        variant="contained"
                        endIcon={<SendRoundedIcon />}
                        disabled={error}
                        onClick={() => {  
                            if (commentText.length != 0) {
                                onSend?.(commentText)
                                setCommentText("")
                            }
                        }}
                    >
                        Отправить
                    </Button>
                </Box>
            </Box>
        </FormControl>
    )
}


export function CommentAnonymusInput() {

    const [authModalOpened, setAuthModalOpened] = useState(false);

    return (
        <>
            <Paper
                sx={{
                    py: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    boxShadow: "none",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography>Чтобы оставить комментарий, необходимо войти</Typography>
                <Button
                    variant="contained"
                    onClick={() => setAuthModalOpened(true)}
                    sx={{
                        mt: 1
                    }}
                >
                    Войти
                </Button>
            </Paper>
            <AuthModal 
                open={authModalOpened}
                onClose={() => setAuthModalOpened(false)}
            />
        </>
    )
}

export default function CommentInput({
    onSend,
    ...props
}: {
    onSend?: (text: string) => void
} & FormControlProps) {

    const authProfile = useAppSelector(state => state.authProfile.profile)
    
    return (
        <>
            { authProfile ?
                <CommentAuthorizedInput 
                    onSend={onSend}
                    {...props}
                />
                :
                <CommentAnonymusInput />
            }
        </>
    )
}
