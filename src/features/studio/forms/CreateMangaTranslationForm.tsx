import { Controller, useForm, UseFormReturn } from "react-hook-form"
import MangaSelectWithSearch from "@/components/MangaSelectWithSearch"
import PrivacySelect from "@/components/PrivacySelect"
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import EditSelect from "@/components/edit/EditSelect"
import LanguageSelect from "@/components/LanguageSelect"

export interface MangaTranslationCreateFormSchema {
    name: string,
    lang: number,
    privacy: number

}

export function getDefaultValues() {
    return {
        name: "",
        lang: 1,
        privacy: 1
    }
}

export function useCreateForm() {
    return useForm<MangaTranslationCreateFormSchema>({
        defaultValues: getDefaultValues()
    })
}

export function convertFormToJSON(data: MangaTranslationCreateFormSchema) {
    return {
        name: data.name,
        lang_id: data.lang,
        privacy_id: data.privacy
    }
}

export default function CreateMangaTranslationForm({
    handleSubmit,
    control,
    onCreate
}: {
    onCreate?: (translation: MangaTranslationCreateFormSchema) => void,
} & UseFormReturn<MangaTranslationCreateFormSchema>) {

    const onSubmit = async (data: MangaTranslationCreateFormSchema) => {
        onCreate?.(data)
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
                name="lang"
                control={control} 
                rules={{
                    required: true,
                }}
                render={({field: {value, onChange}}) => (
                    <LanguageSelect
                        value={value}
                        onChange={onChange}
                    />
                )}  
            />
            <Controller
                name="privacy"
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