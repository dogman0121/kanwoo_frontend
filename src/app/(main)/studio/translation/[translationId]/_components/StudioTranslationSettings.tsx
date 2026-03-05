"use client"

import ButtonWithConfirm from "@/components/ButtonWithConfirm"
import { Button, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle, IconButton } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { useAppSelector } from "@/lib/state/hooks"
import { useRouter } from "next/navigation"
import { studioClientApi } from "@/lib/fetch/features/studio/client"
import { clientFetch } from "@/lib/fetch/clientFetch"

export default function StudioTranslationSettings({sx, onClose, ...props}: DialogProps) {
    const authProfile = useAppSelector(state => state.authProfile.profile)
    const translation = useAppSelector(state => state.studioPageTranslation.translation)

    const router = useRouter()

    const handleDeleteManga = async () => {
        if (!translation) return;

        await clientFetch.post(`/studio/translation/${translation.id}/deleteTranslation`)

        if (translation.is_official)
            router.push(`/studio/manga/${translation.manga?.slug}`)
        else
            router.push(`/studio/profile/${authProfile?.slug}`)
    }

    return (
        <Dialog
            {...props}
            sx={{
                ...sx,
                "& .MuiPaper-root": {
                    width: "560px",
                    height: "400px"
                }
            }}
            onClose={onClose}
        >
            <DialogTitle>Настройки</DialogTitle>
            <IconButton
                onClick={() => onClose?.({}, "escapeKeyDown")}
                sx={{
                    position: "absolute",
                    top: "15px",
                    right: "15px"
                }}
            >
                <CloseRoundedIcon 
                />
            </IconButton>
            <DialogContent>
                <ButtonWithConfirm 
                    variant="contained"
                    onClick={handleDeleteManga}
                >
                    Удалить перевод
                </ButtonWithConfirm>
            </DialogContent>
        </Dialog>
    )
}