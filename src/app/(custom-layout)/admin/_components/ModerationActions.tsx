import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField, useTheme } from "@mui/material";
import { MODERATION_STATUS } from "../_types/moderationStatus";
import { useAppSelector } from "@/lib/state/hooks";
import { useState } from "react";
import ButtonWithConfirm from "@/components/ButtonWithConfirm";

export function ModeraionDialog({onClose, onSend, ...props}: DialogProps & {onSend: (message:string) => void}) {
    const meta = useAppSelector(state => state.meta);

    const [message, setMessage] = useState("")

    if (!meta) return

    return (
        <Dialog
            onClose={onClose}
            {...props}
        >
            <DialogTitle>Отклонение модерации</DialogTitle>
            <DialogContent>
                <TextField 
                    fullWidth
                    multiline
                    minRows={3}
                    label={"Сообщение пользователю"}
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
                    onClick={() => {
                        onSend(message)
                        onClose?.({}, "escapeKeyDown")
                    }}
                >
                    Отправить
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default function ModerationActions({
    value,
    onReject,
    onApprove,
    onWaiting
}: {
    value: MODERATION_STATUS,
    onReject: (message?: string) => void,
    onApprove: (message?: string) => void,
    onWaiting: (message?: string) => void
}) {
    const theme = useTheme()

    const [moderateDialogOpen, setModerateDialogOpen] = useState(false)
    const [declineDialogOpen, setDeclineDialogOpen] = useState(false)


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: theme.spacing(1)
                }}
            >
                {value == MODERATION_STATUS.WAITING ?
                    <>
                        <ButtonWithConfirm
                            variant="outlined"
                            onClick={() => onApprove()}
                        >
                            Одобрить
                        </ButtonWithConfirm>
                        <Button
                            variant="contained"
                            onClick={() => setDeclineDialogOpen(true)}
                        >
                            Отклонить
                        </Button>
                    </>
                    :
                    <Button
                        variant="outlined"
                        onClick={() => setModerateDialogOpen(true)}
                    >
                        На модерацию
                    </Button>
                }
            </Box>
            <ModeraionDialog 
                open={moderateDialogOpen}
                onClose={() => setModerateDialogOpen(false)}
                onSend={(message) =>onWaiting(message)}
            />
            <ModeraionDialog 
                open={declineDialogOpen}
                onClose={() => setDeclineDialogOpen(false)}
                onSend={(message) => onReject(message)}
            />
        </>
    )
}