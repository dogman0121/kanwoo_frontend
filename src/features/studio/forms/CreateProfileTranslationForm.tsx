import { MangaShort } from "@/features/manga/types"
import { Controller, useForm, UseFormReturn } from "react-hook-form"
import { StudioTranslation } from "../types/studio-translation.type"
import MangaSelectWithSearch from "@/components/MangaSelectWithSearch"
import EditInput from "@/components/edit/Input"
import PrivacySelect from "@/components/PrivacySelect"
import { TextField } from "@mui/material"
import { studioClientAPI } from "../api/client.api"
import { useAppSelector } from "@/lib/state/hooks"
import { selectProfile } from "../states/profile/page.slice"
import LanguageSelect from "@/components/LanguageSelect"

export interface ProfileTranslationCreateFormSchema {
    name: string,
    manga: MangaShort | null,
    privacy: number,
    lang: number

}

export function getDefaultValues() {
    return {
        name: "",
        manga: null,
        lang: 1,
        privacy: 1
    }
}

export function useCreateForm() {
    return useForm<ProfileTranslationCreateFormSchema>({
        defaultValues: getDefaultValues()
    })
}

export function convertFormToJSON(data: ProfileTranslationCreateFormSchema) {
    if (!data.manga)
        throw new Error("Manga slug can't be undefined")

    return {
        name: data.name,
        manga_id: data.manga.id,
        privacy_id: data.privacy,
        lang_id: data.lang,
    }
}

export default function CreateProfileTranslationForm({
    handleSubmit,
    control,
    onCreate
}: {
    onCreate?: (translation: ProfileTranslationCreateFormSchema) => void,
} & UseFormReturn<ProfileTranslationCreateFormSchema>) {

    const onSubmit = async (data: ProfileTranslationCreateFormSchema) => {
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