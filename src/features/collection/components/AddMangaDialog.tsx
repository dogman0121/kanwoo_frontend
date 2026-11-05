import MangaSelectWithSearch from "@/components/MangaSelectWithSearch"
import { addMangaIntoCollection } from "@/features/collection/states/lib/thunks"
import { useAppDispatch } from "@/lib/state/hooks"
import { Manga, MangaShort } from "@/types/manga"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import { addManga } from "../states/collection-page/slice"

export default function AddMangaDialog({
    open,
    onClose,
    context
}: {
    open: boolean,
    onClose: () => void,
    context: {
        collectionID: number
    }
}) {
    const dispatch = useAppDispatch()
    
    const [value, setValue] = useState<MangaShort | null>(null)

    const handleChoose = (value: MangaShort | null) => {
        setValue(value)
    }

    const handleAddManga = async () => {
        if (!value) return

        await dispatch(addMangaIntoCollection({mangaId: value.id, collectionId: context.collectionID})).unwrap()

        dispatch(addManga(value))
        setValue(null)

        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Добавление манги</DialogTitle>
            <DialogContent>
                <MangaSelectWithSearch 
                    value={value}
                    onChange={handleChoose}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onClose}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={value == null}
                    onClick={handleAddManga}
                >
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    )
}