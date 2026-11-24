import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import EditPageContainer from "@/components/edit/EditPageContainer";
import { routes, toHref } from "@/constants/routes/main.routes";
import { studioClientAPI } from "@/features/studio/api/client.api";
import UpdateMangaInfoForm, { convertFormIntoFormData, MangaUpdateInfoFormSchema, useUpdateMangaInfoForm } from "@/features/studio/forms/UpdateMangaInfoForm";
import { selectManga, setStudioManga } from "@/features/studio/states/manga/page.slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function PPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const manga = useAppSelector(selectManga)
    
    const {formState, reset, ...formProps} = useUpdateMangaInfoForm(manga)

    const handleUpdateProfile = async (data: MangaUpdateInfoFormSchema) => {
        if (!manga) return

        const formData = convertFormIntoFormData(data)

        const response = await studioClientAPI.updateManga(manga.slug, formData)

        dispatch(setStudioManga({
            data: response.data
        }))
        router.replace(toHref(routes.studio.manga.item, {slug: response.data.slug}))
    }

    return (
        <Box
            sx={{
                width: "100%"
            }}
        >
            <EditHeader>Основная информация</EditHeader>
            <EditHeaderNav
                buttons={
                    <>
                        <Button
                            variant="outlined"
                            disabled={!formState.isDirty}
                            type="reset"
                            onClick={() => reset()}
                        >
                            Отменить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={(!formState.isValid || !formState.isDirty)}
                            type="submit"
                            form="manga-info"
                        >
                            Сохранить
                        </Button>
                    </>
                }
            />
            <EditPageContainer
                sx={{
                    py: 2
                }}
            >
                <UpdateMangaInfoForm 
                    reset={reset}
                    onUpdate={handleUpdateProfile}
                    formState={formState}
                    {...formProps}
                />
            </EditPageContainer>
        </Box>
    )
}