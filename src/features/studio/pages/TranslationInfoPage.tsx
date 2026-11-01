"use client"

import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import EditPageContainer from "@/components/edit/EditPageContainer";
import UpdateTranslationInfoForm, { TranslationUpdateInfoFormSchema, useUpdateTranslationInfoForm } from "@/features/studio/forms/UpdateTranslationInfoForm";
import { selectTranslation, updateTranslation } from "@/features/studio/states/translation/page.slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button } from "@mui/material";

export default function TranslationInfoPage() {
    const dispatch = useAppDispatch()

    const translation = useAppSelector(selectTranslation)

    const {formState, reset, ...formProps} = useUpdateTranslationInfoForm(translation)

    const handleUpdate = async (data: TranslationUpdateInfoFormSchema) => {
        if (!translation) return

        dispatch(updateTranslation({translationId: translation.id, form: data}))
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
                            form="translation-info"
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
                <UpdateTranslationInfoForm
                    reset={reset}
                    onUpdate={handleUpdate}
                    formState={formState}
                    {...formProps}
                />
            </EditPageContainer>
        </Box>
    )
}