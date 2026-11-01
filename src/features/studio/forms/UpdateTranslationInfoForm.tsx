import { Box, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { StudioTranslation } from "../types/studio-translation.type";
import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import EditInput from "@/components/edit/Input";
import EditSelect from "@/components/edit/EditSelect";
import { ReadingModeEnum } from "@/features/translations/entities/reading-mode.enum";


const convertDataIntoForm = (translation: StudioTranslation) => {
    return {
        name: translation.name,
        privacy: translation.privacy.id,
        defaultReadingModeId: translation.default_reading_mode?.id || ReadingModeEnum.VERTICAL
    }
}

export interface TranslationUpdateInfoFormSchema {
    name: string,
    privacyId: Privacy,
    defaultReadingModeId: number
}

export const useUpdateTranslationInfoForm = (translation?: StudioTranslation | null) => {
    const {reset, ...props} = useForm<TranslationUpdateInfoFormSchema>({
        mode: "onChange",
        defaultValues: {
            name: "",
            privacyId: Privacy.PRIVATE,
            defaultReadingModeId: ReadingModeEnum.VERTICAL
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
                    name="privacyId"
                    render={({field}) => (
                        <PrivacySelect 
                            sx={{
                                maxWidth: "400px"
                            }}
                            {...field}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="defaultReadingModeId"
                    render={({field}) => (
                        <EditSelect
                            label="Режим чтения по умолчанию"
                            caption='В таком режиме будут читать пользователи, у которых установлено "авто"в настройках чтения.'
                            {...field}
                        >
                            <MenuItem value={ReadingModeEnum.VERTICAL}>вертикальный</MenuItem>
                            <MenuItem value={ReadingModeEnum.HORIZONTAL}>горизонтальный</MenuItem>
                        </EditSelect>
                    )}
                />
            </Box>
        </form>
    )
}