"use client"

import { Modal, ModalProps } from "@mui/material";
import Auth from "./Auth";
import { useAppDispatch } from "@/lib/state/hooks";
import Wrapper from "./Wrapper";
import { useEffect } from "react";
import { initialize } from "../states/auth/slice";

export interface AuthModalProps {
    open: boolean,
    onClose: () => void
}

export default function AuthModal({open, onClose}: AuthModalProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (open) {
            dispatch(initialize())
        }
    }, [open])

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Auth/>
        </Modal>
    )
}