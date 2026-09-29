"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Box, BoxProps, Button, ButtonProps, FormControl, FormControlProps, IconButton, IconButtonProps, InputBase, Paper, SxProps, Typography, useTheme } from "@mui/material"
import { ChangeEvent, Children, MouseEvent, useState, useTransition } from "react"
import SendRoundedIcon from "@mui/icons-material/SendRounded"
import AuthModal from "@/features/auth/components/AuthModal"
import { MAX_COMMENT_LENGTH } from "@/constants/comments"
import { selectAuthProfile } from "@/features/global/states/auth-profile/auth-profile.slice"
import { setAuthSnackbarOpen } from "@/features/global/states/app/slice"

type CommentAuthorizedWithoutSizeProps = {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onSend?: () => void
    value: string,
    disabled: boolean,
    sx?: SxProps,
    slotProps?: {
        sendButton?: IconButtonProps
    }
}

type CommentAuthorizedWithSizeProps = {
    size: "small" | "medium",
    onSend?: (text: string) => void,
    sx?: SxProps,
    slotProps?: {
        sendButton?: IconButtonProps
    }
}

function InputContainer({
    children,
    sx,
    ...props
}: BoxProps) {
    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",

                py: 1,
                px: 2,
                ...sx
            }}
            {...props}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}

function MediumInputInner({
    onChange,
    value,
    disabled,
    onSend,
    sx
}: CommentAuthorizedWithoutSizeProps) {

    const handleSend = (event: MouseEvent) => {
        event.stopPropagation()

        onSend?.()
    }
    
    return (
        <InputContainer
            sx={{
                display: "flex",
                flexDirection: "column",
                py: 2,
                ...sx
            }}
        >
            <InputBase 
                fullWidth
                multiline
                value={value}
                onChange={onChange}
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
                <Typography> {value.length} / {MAX_COMMENT_LENGTH} </Typography>
                <Button
                    variant="contained"
                    endIcon={<SendRoundedIcon />}
                    size="small"
                    disabled={disabled}
                    onClick={handleSend}
                >
                    Отправить
                </Button>
            </Box>
        </InputContainer>
    )
}

function SmallInputInner({
    value,
    onChange,
    disabled,
    onSend,
    sx,
    slotProps = {},
    ...props
}: CommentAuthorizedWithoutSizeProps) {
    const theme = useTheme()

    const handleSend = (event: MouseEvent) => {
        event.stopPropagation()
        
        onSend?.()
    }

    return (
        <InputContainer
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "end",
                gap: 1,
                ...sx
            }}
        >
            <InputBase 
                fullWidth
                multiline
                size="small"
                maxRows={4}
                value={value}
                onChange={onChange}
                placeholder="Введите текст комментария"
            />
            <IconButton 
                size="small" 
                disabled={disabled}
                onClick={handleSend}
                sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,

                    "&:hover": {
                        bgcolor: theme.palette.primary.main
                    },
                    "&.Mui-disabled": {
                        bgcolor: theme.palette.secondary.main
                    }
                }}
                {...slotProps.sendButton}
            >
                <SendRoundedIcon fontSize="small" />
            </IconButton>
        </InputContainer>
    )
}

export default function CommentInput({
    size,
    onSend,
    sx,
    slotProps = {},
    ...props
}: CommentAuthorizedWithSizeProps & FormControlProps  ) {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)

    const [isPending, startTransition] = useTransition()
    const [commentText, setCommentText] = useState("");

    const [error, setError] = useState(false)

    const handleSend = () => {
        if (!authProfile)
            return dispatch(setAuthSnackbarOpen(true))

        if (commentText.length != 0) {
            startTransition(async () => {
                onSend?.(commentText)
            })
            setCommentText("")
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;

        setError(text.length > MAX_COMMENT_LENGTH)
        setCommentText(event.target.value)
    }

    return (
        <FormControl
            fullWidth
            {...props}
        >
            { size=="small" ?
                <SmallInputInner 
                    onSend={handleSend}
                    disabled={isPending || error}
                    value={commentText}
                    onChange={handleChange}
                    sx={sx}
                    slotProps={slotProps}
                />
                :
                <MediumInputInner 
                    onSend={handleSend}
                    disabled={isPending || error}
                    value={commentText}
                    onChange={handleChange}
                    sx={sx}
                />
            }
        </FormControl>
    )
}
