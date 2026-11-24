import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import { openSnackbar } from "@/features/global/states/app/slice";
import { studioClientAPI } from "@/features/studio/api/client.api";
import CreateMangaTranslationDialog from "@/features/studio/components/CreateMangaTranslationDialog";
import CreateTranslationDialog from "@/features/studio/components/CreateProfileTranslationDialog";
import StudioList from "@/features/studio/components/List";
import TranslationRow, { TranslationHeader } from "@/features/studio/components/TranslationRow";
import { convertFormToJSON, MangaTranslationCreateFormSchema } from "@/features/studio/forms/CreateMangaTranslationForm";
import { selectCreateTranslationDialogOpen, selectManga, setCreateTranslationDialogOpen } from "@/features/studio/states/manga/page.slice";
import { addTranslation, selectTranslations } from "@/features/studio/states/manga/translations.slice";
import { ApiError } from "@/lib/fetch/api-response.types";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Button, Divider } from "@mui/material";

export default function PPage() {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)
    const translations = useAppSelector(selectTranslations)
    const createTranslationDialogOpen = useAppSelector(selectCreateTranslationDialogOpen)
        
    const handleCloseDialog = () => {
        dispatch(setCreateTranslationDialogOpen(false))
    }

    const handleCreateTranslation = async (data: MangaTranslationCreateFormSchema) => {
        if (!manga) return

        try {
            const formData = convertFormToJSON(data)

            const response = await studioClientAPI.createMangaTranslation(manga.slug, formData)

            dispatch(addTranslation({
                data: response.data,
                context: response.context
            }))
            dispatch(openSnackbar({type: "success", message: "Перевод добавлен успешно"}))
            dispatch(setCreateTranslationDialogOpen(false))
        } catch (e) {
            let errorMessage = "неизвестная ошибка"
            if (e instanceof ApiError) {
                if (e.code == "already_exists") {
                    errorMessage = "перевод уже существует"
                }
            }
            dispatch(openSnackbar({
                type: "error", 
                message: `При добавлении перепода произошла ошибка: ${errorMessage}`
            }))
        }
    }
    return (
        <>
            <EditHeader>Мои переводы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                            onClick={() => dispatch(setCreateTranslationDialogOpen(true))}
                        >
                            Создать
                        </Button>
                    </>
                }
            />
            <TranslationHeader />
            <Divider />
            <StudioList
            >
                {translations.map(t => (
                    <TranslationRow key={`studio_translations_${t.data.id}`} translationEntity={t}/>
                ))}
            </StudioList>
            <CreateMangaTranslationDialog
                open={createTranslationDialogOpen}
                onCreate={handleCreateTranslation}
                onClose={handleCloseDialog}
            />
        </>
    )
}