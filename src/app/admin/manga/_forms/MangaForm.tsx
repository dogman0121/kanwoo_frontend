import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { Control, Controller, UseFormHandleSubmit, UseFormReturn } from "react-hook-form"
import { Grid } from "@mui/material"
import MangaPoster from "@/features/form/manga/components/MangaPoster"
import MangaName from "@/features/form/manga/components/MangaName"
import MangaDescription from "@/features/form/manga/components/MangaDescription"
import MangaType from "@/features/form/manga/components/MangaType"
import MangaStatus from "@/features/form/manga/components/MangaStatus"
import MangaYear from "@/features/form/manga/components/MangaYear"
import MangaAdult from "@/features/form/manga/components/MangaAdult"
import MangaGenres from "@/features/form/manga/components/MangaGenres"
import MangaBackground from "@/features/form/manga/components/MangaBackground"
import MangaPromoBackground from "@/features/form/manga/components/MangaPromoBackground"
import MangaPromoLogo from "@/features/form/manga/components/MangaPromoLogo"
import MangaSlug, { validateSlug } from "@/features/form/manga/components/MangaSlug"
import MangaNameTranslations from "@/features/form/manga/components/MangaNameTranslations"
import { useState } from "react"
import { throttle } from "lodash"
import MangaPromoName from "@/features/form/manga/components/MangaPromoName"
import PrivacySelect, { Privacy } from "@/components/PrivacySelect"
import AdminManga from "@/types/admin/manga/manga"

export function getFormDefaultValues() {
    return {
        name: "",
        description: "",
        nameTranslations: [],
        type: 1,
        status: 1,
        adult: 1,
        genres: [],
        year: new Date().getFullYear()
    }
}

export function getFormData(manga: AdminManga) {
    return {
        name: manga.name || "",
        slug: manga.slug || "",
        description: manga.description || "",
        nameTranslations: manga.name_translations?.map(l => (
            {lang: l.lang.id, name: l.name}
        )) || [],
        type: manga.type?.id || 1 ,
        status: manga.status?.id || 1,
        adult: manga.adult?.id || 1,
        genres: manga.genres?.map(genre => genre.id) || [],
        year: manga.year || new Date().getFullYear(),
        background: manga?.background,
        poster: manga.poster?.medium,
        promoBackground: manga.promo_background,
        promoName: manga.promo_name,
        promoLogo: manga.promo_logo,
        privacy: manga.privacy?.id || 1
    }
}

export interface MangaFormSchema {
    slug: string,
    name: string,
    nameTranslations: {name: string, lang: number}[],
    description: string,
    year: number,
    type: number,
    status: number,
    adult: number,
    genres: number[],
    poster: File | string | null,
    background: File | string | null,
    promoBackground: File | string | null,
    promoName: File | string | null,
    promoLogo: File | string | null
    privacy: number,
}

export default function MangaForm({
    onSend,
    control,
    manga,
    handleSubmit,
}: {
    onSend: (data: MangaFormSchema) => void,
    control: Control<MangaFormSchema>,
    handleSubmit: UseFormHandleSubmit<MangaFormSchema>,
    manga?: AdminManga
}) {
    const [slugChecking, setSlugChecking] = useState(false)

    const onSubmit = (data: MangaFormSchema) => {
        onSend(data)
    }

    return (
        <form id="manga-info" onSubmit={handleSubmit(onSubmit)}>
            <EditPageContainer
                sx={{
                    py: "20px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px"
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
                        validate: throttle(async (value) => {
                            if (manga && value == manga.slug) return;
                            
                            setSlugChecking(true)
                            
                            const res = await validateSlug(value)

                            setSlugChecking(false)

                            if (res)
                                return true
                            else
                                return "Данный тег команды занят"
                        }, 500)
                    }}
                    render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                        <MangaSlug 
                            defaultValue={""}
                            slugChecking={slugChecking}
                            value={value}
                            error={invalid}
                            helperText={error?.message}
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
                    name="promoBackground"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <MangaPromoBackground 
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
            </EditPageContainer>
        </form>
    )
}