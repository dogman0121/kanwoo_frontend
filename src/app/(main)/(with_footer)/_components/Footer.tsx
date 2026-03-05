"use client"

import AppSnackbar from "@/components/AppSnackbar"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, styled, TextField, Typography, useTheme } from "@mui/material"
import { useState } from "react"

function FeedbackDialog({onClose, ...props}: DialogProps) {
    const [message, setMessage] = useState("")

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false)

    const handleSendFeedback = () => {
        clientFetch.post("/sendFeedback", {
            body: JSON.stringify({
                message: message
            })
        })

        setSuccessSnackbarOpen(true)
    }

    return (
        <>
            <Dialog
                onClose={onClose}
                {...props}
            >
                <DialogTitle>
                    Обратная связь
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="feedback-input"
                        fullWidth
                        multiline
                        minRows={3}
                        placeholder="Введите сообщение"
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => onClose?.({}, "escapeKeyDown")}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSendFeedback}
                    >
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                open={successSnackbarOpen}
                variant="success" 
                message="Обратная связь отправлена успешна"
                onClose={() => setSuccessSnackbarOpen(false)}
            />
        </>
    )
}

const FooterSection = styled(Box)({
    display: "flex",
    flexDirection: "column",
    rowGap: "20px"    
})

const FooterList = styled(Box)({
    display: "flex",
    flexDirection: "column",
    rowGap: "10px"    
})

const FooterHeader = styled(Typography)({
    fontSize: "24px"
})

const FooterText = styled(Typography)({
    fontSize: "16px",

    "&:hover": {
        textDecoration: "underline"
    }
}) 

export default function Footer() {
    const theme = useTheme()

    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)

    return (
        <>
            <Box
                component={"footer"}
                sx={[
                    {
                        mt: "40px",
                    },
                    theme.applyStyles("light", {
                        backgroundColor: "#E8E8E8"
                    }),
                    theme.applyStyles("dark", {
                        backgroundColor: "#06090E"
                    })
                ]}
            >
                <Container maxWidth="lg"
                    sx={{
                        py: "50px",
                    }}
                >
                    <Grid
                        container
                        columns={{md: 3, sm: 1}}
                        spacing={5}
                    >
                        <Grid
                            size={1}
                        >
                            <Box>
                                <Typography fontSize={"36px"}>KANWOO</Typography>
                                <FooterText
                                    sx={{
                                        ":hover": {
                                            cursor: "pointer"
                                        }
                                    }}
                                    onClick={() => setFeedbackDialogOpen(true)}
                                >
                                    Обратная связь
                                </FooterText>
                            </Box>
                            <Box
                                sx={{
                                    mt: "20px"
                                }}
                            >
                                <FooterHeader> Почта для связи</FooterHeader>
                                <FooterText>
                                    contact@kanwoo.ru
                                </FooterText>
                            </Box>
                        </Grid>
                        <Grid
                            size={1}
                        >
                            <FooterSection>
                                <FooterHeader>Полезные статьи</FooterHeader>
                                <FooterList>
                                    <FooterText>Как добавить мангу</FooterText>
                                    <FooterText>Как добавить перевод</FooterText>
                                    <FooterText>Как добавить главу</FooterText>
                                </FooterList>
                            </FooterSection>
                        </Grid>
                        <Grid
                            size={1}
                        >
                            <FooterSection>
                                <FooterHeader>Инфо</FooterHeader>
                                <FooterList>
                                    <FooterText>Пользовательское соглашение</FooterText>
                                    <FooterText>Для правообладателей</FooterText>
                                </FooterList>
                            </FooterSection>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <FeedbackDialog 
                open={feedbackDialogOpen}
                onClose={() => setFeedbackDialogOpen(false)}
            />
        </>
    )
}