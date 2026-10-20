import { Box, Grid } from "@mui/material";
import { Profile } from "@/features/profile/types/profile.type";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectAuthProfile } from "@/features/global/states/auth-profile";
import { StudioManga } from "../types/studio-manga.type";
import { selectManga } from "../states/manga/page.slice";
import MangaName from "@/features/manga/forms/components/MangaName";
import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import MangaNameTranslations from "@/features/manga/forms/components/MangaNameTranslations";
import useSlugValidator from "@/features/manga/hooks/use-slug-validator.hook";
import MangaSlug from "@/features/manga/forms/components/MangaSlug";
import MangaDescription from "@/features/manga/forms/components/MangaDescription";
import MangaType from "@/features/manga/forms/components/MangaType";
import MangaStatus from "@/features/manga/forms/components/MangaStatus";
import MangaYear from "@/features/manga/forms/components/MangaYear";
import MangaAdult from "@/features/manga/forms/components/MangaAdult";
import MangaGenres from "@/features/manga/forms/components/MangaGenres";
import MangaPromoName from "@/features/studio/components/ui/manga/PromoName";
import MangaPromoBackground from "@/features/studio/components/ui/manga/PromoBackground";
import MangaPromoLogo from "@/features/studio/components/ui/manga/PromoLogo";
import MangaBackground from "@/features/studio/components/ui/manga/Background";
import { act, useEffect } from "react";
import MangaPoster from "../components/ui/manga/Poster";


const convertDataIntoForm = (manga?: StudioManga | null) => {
    return {
        slug: manga?.slug || "",
        name: manga?.name || "",
        description: manga?.description || "",
        genres: manga?.genres.map(g => g.id) || [],
        adult: manga?.adult.id || 1,
        privacy: manga?.privacy.id || 1,
        type: manga?.type.id || 1,
        year: manga?.year || new Date().getFullYear(),
        status: manga?.status.id || 1,
        nameTranslations: manga?.name_translations.map(nt => ({lang: nt.lang.id, name: nt.name})) || [],
        poster: manga?.poster?.medium || null,
        background: manga?.background || null,
        promoName: manga?.promo_name || null,
        promoBackground: manga?.promo_background || null,
        promoLogo: manga?.promo_logo || null
    }
}

const prepareFileAction = (file: string | File | null) => {
    let action: "update" | "keep" | "delete";

    if (file instanceof File)
        action = "update"
    else if (file == null)
        action = "delete"
    else
        action = "keep"

    return action
}

export function convertFormIntoFormData(data: MangaUpdateInfoFormSchema) {
    const formData = new FormData()

    formData.set("name", data.name)
    formData.set("slug", data.slug)
    formData.set("privacy_id", data.privacy.toString())
    formData.set("description", data.description)
    formData.set("year", data.year.toString())
    formData.set("type_id", data.type.toString())
    formData.set("status_id", data.status.toString())
    formData.set("adult_id", data.adult.toString())
    formData.set("poster_action", prepareFileAction(data.poster))
    formData.set("background_action", prepareFileAction(data.background))
    formData.set("promo_name_action", prepareFileAction(data.promoName))
    formData.set("promo_logo_action", prepareFileAction(data.promoLogo))
    formData.set("promo_background_action", prepareFileAction(data.promoBackground))
    formData.set("name_translations", JSON.stringify(data.nameTranslations))

    for (let g of data.genres) {
        formData.set("genre_id", g.toString())
    }

    data.poster && formData.set("poster", data.poster)
    data.background && formData.set("background", data.background)
    data.promoName && formData.set("promo_name", data.promoName)
    data.promoLogo && formData.set("promo_logo", data.promoLogo)
    data.promoBackground && formData.set("promo_background", data.promoBackground)
    
    return formData
}

export interface MangaUpdateInfoFormSchema {
    slug: string,
    name: string,
    description: string,
    genres: number[],
    adult: number,
    privacy: number,
    type: number,
    status: number,
    year: number,
    nameTranslations: {lang: number, name: string}[],
    poster: string | File | null,
    background: string | File | null,
    promoName: string | File | null,
    promoBackground: string | File | null,
    promoLogo: string | File | null
}



export const useUpdateMangaInfoForm = (manga?: StudioManga) => {
    const {reset, ...props} = useForm<MangaUpdateInfoFormSchema>({
        mode: "onChange",
        defaultValues: convertDataIntoForm(manga)
    }) 

    useEffect(() => {
        if (manga)
            reset(convertDataIntoForm(manga))
    }, [manga])

    return {
        reset,
        ...props
    }
}

export default function UpdateMangaInfoForm({
    control,
    handleSubmit, 
    onUpdate
}: {
    onUpdate?: (data: MangaUpdateInfoFormSchema) => void
} & ReturnType<typeof useUpdateMangaInfoForm>) {
    const manga = useAppSelector(selectManga)

    const {validate, validating, isValid} = useSlugValidator()

    const onSubmit = async (data: MangaUpdateInfoFormSchema) => {
        onUpdate?.(data)
    }

    if (!manga) return

    return (
        <form id="manga-info" onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}
            >
                <Controller
                    name="poster"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <MangaPoster 
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="name"
                    rules={{
                        required: "Это поле не должно быть пустым"
                    }}
                    render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                        <MangaName
                            value={value}
                            {...props}
                            error={invalid}
                            helperText={error?.message}
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
                <Controller 
                    control={control}
                    name="nameTranslations"
                    rules={{
                        maxLength: 1000
                    }}
                    render={({field: {value, onChange}}) => (
                        <MangaNameTranslations
                            value={value}
                            onChange={onChange}
                        />
                    )}
                /> 
                <Controller 
                    control={control}
                    name="slug"
                    rules={{
                        required: "Это поле не должно быть пустым",
                        validate: async (value) => {
                            validate(value)

                            return true
                        }
                    }}
                    render={({field: {value, ...props}, fieldState: {error}, formState}) => (
                        <MangaSlug 
                            defaultValue={formState.defaultValues?.["slug"]}
                            slugChecking={validating}
                            value={value}
                            error={formState.defaultValues?.["slug"] != value && !validating && !isValid}
                            helperText={formState.defaultValues?.["slug"] != value && !validating && !isValid ? "Данный тег занят" : error?.message}
                            {...props}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="description"
                    rules={{
                        maxLength: 1000
                    }}
                    render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                        <MangaDescription 
                            value={value}
                            {...props}
                            error={invalid}
                            helperText={error?.type == "maxLength" && "Описание не может быть больше 1000 символов"}
                        />
                    )}
                />
                <Grid 
                    container 
                    columnSpacing={3} 
                    rowSpacing={2}
                    columns={{md: 3, xs: 1}}
                >
                    <Grid size={1}>
                        <Controller 
                            name="type"
                            control={control}
                            render={({field: {value, ...props}}) => (
                                <MangaType
                                    label="Тип"
                                    value={value}
                                    {...props}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={1}>
                        <Controller 
                            name="status"
                            control={control}
                            render={({field: {value, ...props}}) => (
                                <MangaStatus
                                    label="Статус"
                                    value={value}
                                    {...props}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={1}>
                        <Controller 
                            name="year"
                            control={control}
                            render={({field: {value, ...props}}) => (
                                <MangaYear 
                                    value={value}
                                    {...props}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={1}>
                        <Controller 
                            name="adult"
                            control={control}
                            render={({field: {value, ...props}}) => (
                                <MangaAdult
                                    value={value}
                                    {...props}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Controller 
                    name="genres"
                    control={control}
                    render={({field: {value, onChange, ...props}}) => (
                        <MangaGenres
                            value={value}
                            onChange={onChange}
                            {...props}
                        />
                    )}
                />
                <Controller 
                    name="background"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <MangaBackground
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller 
                    name="promoName"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <MangaPromoName 
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller 
                    name="promoLogo"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <MangaPromoLogo
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller 
                    name="promoBackground"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <MangaPromoBackground
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </Box>
        </form>
    )
}