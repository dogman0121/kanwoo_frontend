import MangaSelectWithSearch from "@/components/MangaSelectWithSearch"
import { addMangaIntoCollection } from "@/features/collection/states/lib/thunks"
import { useAppDispatch } from "@/lib/state/hooks"
import { Manga, MangaShort } from "@/types/manga"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"

export default function AddMangaDialog({
    open,
    onClose,
    onAdd,
    context
}: {
    open: boolean,
    onClose: () => void,
    onAdd?: (manga: MangaShort) => void,
    context: {
        collectionID: number
    }
}) {
    const dispatch = useAppDispatch()
    
    const [value, setValue] = useState<MangaShort | null>(null)

    const handleChoose = (value: MangaShort | null) => {
        setValue(value)
    }

    const handleAddManga = () => {
        if (!value) return

        dispatch(addMangaIntoCollection({mangaSlug: value.slug, collectionId: context.collectionID})).unwrap()

        onAdd?.(value)
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