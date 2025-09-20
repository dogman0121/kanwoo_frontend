"use client"

import { Box, IconButton, Modal, ModalProps, Paper, Typography } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function AppModal({title, onClose, children, ...props}: {title: string} & ModalProps) {
    return (
        <Modal {...props}>
            <Paper
                sx={{

                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "min(400px, 100vw)",
                    boxShadow: 24,
                    padding: "24px 32px",
                    border: "none",
                    borderRadius: "20px",
                    "&:focus": {
                        outline: "none"
                    }
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography fontSize={"16px"} fontWeight={600}>{title}</Typography>
                    <IconButton
                        onClick={() => onClose?.({}, "backdropClick")}
                    >
                        <CloseRoundedIcon/>
                    </IconButton>
                </Box>
                <Box>
                    {children}
                </Box>
            </Paper>
        </Modal>
    )
}