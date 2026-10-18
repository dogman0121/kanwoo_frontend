import { MangaShort } from "@/features/manga/types"
import { Controller, useForm, UseFormReturn } from "react-hook-form"
import { StudioTranslation } from "../types/studio-translation.type"
import MangaSelectWithSearch from "@/components/MangaSelectWithSearch"
import EditInput from "@/components/edit/EditInput"
import PrivacySelect from "@/components/PrivacySelect"
import { TextField } from "@mui/material"

export interface TranslationCreateFormSchema {
    name: string,
    manga: MangaShort | null,
    privacy_id: number

}

export function getDefaultValues() {
    return {
        name: "",
        manga: null,
        privacy_id: 1
    }
}

export function useCreateForm() {
    return useForm<TranslationCreateFormSchema>({
        defaultValues: getDefaultValues()
    })
}

export default function CreateTranslationForm({
    handleSubmit,
    control
}: {
    onCreate?: (translation: StudioTranslation) => void,
    onError?: () => void,
    isOfficial?: boolean
} & UseFormReturn<TranslationCreateFormSchema>) {

    const onSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="create-translation">
            <Controller
                name="name"
                control={control} 
                render={({field}) => (
                    <TextField
                        fullWidth 
                        label="Название"
                        {...field}
                    />
                )}  
            />
            <Controller
                name="manga"
                control={control} 
                rules={{
                    required: true,
                }}
                render={({field: {value, onChange}}) => (
                    <MangaSelectWithSearch 
                        value={value}
                        onChange={onChange}
                        sx={{
                            mt: 3
                        }}
                    />
                )}  
            />
            <Controller
                name="privacy_id"
                control={control} 
                render={({field: {value, onChange}}) => (
                    <PrivacySelect
                        value={value}
                        onChange={onChange}
                    />
                )}  
            />
        </form>
    )
}