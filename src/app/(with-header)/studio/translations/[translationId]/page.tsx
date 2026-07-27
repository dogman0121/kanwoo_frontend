"use client"

import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import EditHeader from "@/features/edit/components/EditHeader";
import EditHeaderNav from "@/features/edit/components/EditHeaderNav";
import EditInput from "@/features/edit/components/EditInput";
import EditInputCaption from "@/features/edit/components/EditInputCaption";
import EditInputLabel from "@/features/edit/components/EditInputLabel";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { useAppSelector } from "@/lib/state/hooks";
import Translation from "@/types/translation/translation";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface TranslationEditForm {
    name: string,
    privacy: Privacy    
}

function convertToForm(translation?: Translation | null) {
    return {
        name: translation?.name || "",
        privacy: translation?.privacy.id || Privacy.PRIVATE
    }
}

export default function Page() {
    const translation = useAppSelector(state => state.studioPageTranslation.translation)

    console.log(translation)

    const { 
        control, 
        handleSubmit, 
        formState: {
            isValid, 
            isDirty, 
            defaultValues
        }, 
        reset 
    } = useForm<TranslationEditForm>({
        mode: "onChange",
        defaultValues: convertToForm(translation)
    });
    
    const onSubmit = async (data: TranslationEditForm) => {
        const formData = new FormData();

        formData.append("name", data.name)
        formData.append("privacy", data.privacy.toString())

        const response = await clientFetch.put<Translation>(`/studio/translations/${translation?.id}`, {
            body: formData
        })

        reset(convertToForm(response.data))
    }

    useEffect(() => {
        reset(convertToForm(translation))
    }, [translation])

    return (
        <>
            <EditHeader>Основная инфомация</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="outlined"
                            disabled={!isDirty}
                            type="reset"
                            onClick={() => reset(defaultValues)}
                        >
                            Отменить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={(!isValid || !isDirty)}
                            type="submit"
                            form="translation-info"
                        >
                            Сохранить
                        </Button>
                    </>
                }
            />
            <form id="translation-info" onSubmit={handleSubmit(onSubmit)}>
                <EditPageContainer
                    sx={{
                        py: "20px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "15px"
                    }}
                >
                    <Controller 
                        name="name"
                        control={control}
                        render={({field: {value, ...props}}) => (
                            <EditInput 
                                label={"Название перевода"}
                                caption={"Показывается только переводчикам в творческой студии."}
                                placeholder="Название"
                                value={value}
                                {...props}
                            />
                        )}
                    />
                    <Controller 
                        name="privacy"
                        control={control}
                        render={({field: {value, ...props}}) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <EditInputLabel>Доступ</EditInputLabel>
                                <EditInputCaption>Кто может видеть ваш перевод.</EditInputCaption>
                                <PrivacySelect 
                                    sx={{
                                        maxWidth: "300px"
                                    }}
                                    value={value}
                                    {...props}
                                />
                            </Box>
                        )}
                    />
                </EditPageContainer>
            </form>
        </>
    )
}