"use client"

import { Modal, ModalProps } from "@mui/material";
import Auth from "./Auth";
import { useAppDispatch } from "@/lib/state/hooks";
import Wrapper from "./Wrapper";

export interface AuthModalProps {
    open: boolean,
    onClose: () => void
}

export default function AuthModal({open, onClose}: AuthModalProps) {
    const dispatch = useAppDispatch()

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Wrapper>
                <Auth/>
            </Wrapper>
        </Modal>
    )
}