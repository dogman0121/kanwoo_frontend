import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { StudioTranslation } from "../types/studio-translation.type";
import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import EditInput from "@/components/edit/Input";


const convertDataIntoForm = (translation: StudioTranslation) => {
    return {
        name: translation.name,
        privacy: translation.privacy.id
    }
}

export interface TranslationUpdateInfoFormSchema {
    name: string,
    privacy: number,
}

export const useUpdateTranslationInfoForm = (translation?: StudioTranslation | null) => {
    const {reset, ...props} = useForm<TranslationUpdateInfoFormSchema>({
        mode: "onChange",
        defaultValues: {
            name: "",
            privacy: 1
        }
    });

    useEffect(() => {
        if (translation)
            reset(convertDataIntoForm(translation))
    }, [translation])

    return {
        reset,
        ...props
    }
}

export function convertFormIntoJSON(data: TranslationUpdateInfoFormSchema) {
    return {
        name: data.name,
        privacy_id: data.privacy
    }
}

export default function UpdateTranslationInfoForm({
    control,
    handleSubmit,
    onUpdate 
}: {
    onUpdate?: (data: TranslationUpdateInfoFormSchema) => void
} & ReturnType<typeof useUpdateTranslationInfoForm>) {

    const handleCreate = (data: TranslationUpdateInfoFormSchema) => {
        onUpdate?.(data)
    }

    return (
        <form id="translation-info" onSubmit={handleSubmit(handleCreate)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}
            >
                <Controller 
                    control={control}
                    name="name"
                    render={({field}) => (
                        <EditInput 
                            label="Название"
                            inputProps={{
                                ...field
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="privacy"
                    defaultValue={Privacy.PRIVATE}
                    render={({field}) => (
                        <PrivacySelect 
                            sx={{
                                maxWidth: "400px"
                            }}
                            {...field}
                        />
                    )}
                />
            </Box>
        </form>
    )
}