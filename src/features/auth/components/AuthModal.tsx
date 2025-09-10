"use client"

import { Modal } from "@mui/material"
import AuthBody from "./AuthBody"


export default function AuthModal({open, onClose}: {open: boolean, onClose: () => void}) {
    return (
        <Modal open={open} onClose={onClose}>
            <AuthBody />
        </Modal>
    )
}