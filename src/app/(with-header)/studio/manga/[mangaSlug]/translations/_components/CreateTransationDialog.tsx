import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { studioClientApi } from "@/lib/fetch/features/studio/client";
import { useAppSelector } from "@/lib/state/hooks";
import { ROUTES } from "@/routes";
import Translation from "@/types/translation/translation";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, InputEvent, InputEventHandler, useState } from "react";


export default function CreateTranslationDialog({...props}: DialogProps) {
    const [translationName, setTranslationName] = useState("")
    const [translationsPrivacy, setTranslationPrivacy] = useState(Privacy.PRIVATE);

    const router = useRouter()

    const manga = useAppSelector(state => state.studioPageManga.manga)

    const handleCreateTranslation = async () => {
        if (!manga) return;

        const response = await clientFetch.post<Translation>(`/studio/manga/${manga.slug}/translations`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": translationName,
                "privacy": translationsPrivacy
            })
        });

        router.push(ROUTES.STUDIO.TRANSLATION.MAIN(response.data.id))
    }

    return (
        <Dialog
            {...props}
        >
            <DialogTitle>Создание перевода</DialogTitle>
            <DialogContent>
                <TextField 
                    fullWidth
                    value={translationName}
                    label="Название"
                    onChange={(event) => {
                        setTranslationName(event.target.value)
                    }}
                />
                <PrivacySelect 
                    value={translationsPrivacy}
                    onChange={(event) => {
                        setTranslationPrivacy(event.target.value as Privacy)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCreateTranslation}
                >
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    )
}