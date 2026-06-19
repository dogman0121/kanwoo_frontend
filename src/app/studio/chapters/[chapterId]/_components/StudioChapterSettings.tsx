"use client"

import ButtonWithConfirm from "@/components/ButtonWithConfirm"
import { Dialog, DialogContent, DialogProps, DialogTitle, IconButton } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { useAppSelector } from "@/lib/state/hooks"
import { useRouter } from "next/navigation"
import { clientFetch } from "@/lib/fetch/clientFetch"

export default function StudioChapterSettings({sx, onClose, ...props}: DialogProps) {
    const chapter = useAppSelector(state => state.studioPageChapter.chapter)

    const router = useRouter()

    const handleDeleteManga = async () => {
        if (!chapter) return;

        await clientFetch.post(`/studio/chapter/${chapter.id}/deleteChapter`)

        router.push(`/studio/translation/${chapter?.translation?.id}`)
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
                    Удалить главу
                </ButtonWithConfirm>
            </DialogContent>
        </Dialog>
    )
}