import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { Controller, UseFormReturn } from "react-hook-form";
import MangaPoster from "./components/MangaPoster";
import MangaBackground from "./components/MangaBackground";
import MangaName from "./components/MangaName";
import MangaNameTranslations from "./components/MangaNameTranslations";
import { throttle } from "lodash";
import MangaSlug, { validateSlug } from "./components/MangaSlug";
import MangaDescription from "./components/MangaDescription";
import { Grid } from "@mui/material";
import MangaType from "./components/MangaType";
import MangaStatus from "./components/MangaStatus";
import MangaYear from "./components/MangaYear";
import MangaAdult from "./components/MangaAdult";
import MangaGenres from "./components/MangaGenres";
import MangaPromoName from "./components/MangaPromoName";
import MangaPromoBackground from "./components/MangaPromoBackground";
import MangaPromoLogo from "./components/MangaPromoLogo";
import Manga from "@/types/manga/manga";
import { useState } from "react";

export function convertToForm(manga: Manga) {
    return {
        name: manga.name || "",
        slug: manga.slug || "",
        description: manga.description || "",
        nameTranslations: manga.name_translations.map(l => (
            {lang: l.lang.id, name: l.name}
        )) || [],
        type: manga.type?.id || 1 ,
        status: manga.status?.id || 1,
        adult: manga.adult?.id || 1,
        genres: manga.genres?.map(genre => genre.id) || [],
        year: manga.year || new Date().getFullYear(),
        background: manga.background,
        poster: manga.poster?.medium || null,
        promoBackground: manga.promo_background || null,
        promoName: manga.promo_name || null,
        promoLogo: manga?.promo_logo || null,
        privacy: manga.privacy?.id || 1
    }
}

export interface MangaEditForm {
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
    privacy: number
}

export default function Update({
    manga,
    blockedFields,
    onSend,
    reset,
    control,
    handleSubmit,
    ...props
}: {
    manga: Manga,
    blockedFields: string[],
    onSend: (data: MangaEditForm) => void 
} & UseFormReturn<MangaEditForm>) {
    const [slugChecking, setSlugChecking] = useState(false)
    
    const onSubmit = (data: MangaEditForm) => {
        onSend(data)

        reset(data)
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
                    control={control}
                    name="name"
                    rules={{
                        required: "Это поле не должно быть пустым"
                    }}
                    disabled={ blockedFields.indexOf("name") != -1 }
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
                    name="nameTranslations"
                    rules={{
                        maxLength: 1000
                    }}
                    disabled={ blockedFields.indexOf("name_translations") != -1 }
                    render={({field: {value, onChange, ...props}}) => (
                        <MangaNameTranslations
                            value={value}
                            onChange={onChange}
                            {...props}
                        />
                    )}
                /> 
                <Controller 
                    control={control}
                    name="slug"
                    disabled={ blockedFields.indexOf("slug") != -1 }
                    rules={{
                        required: "Это поле не должно быть пустым",
                        validate: throttle(async (value) => {
                            if (value == manga?.slug)
                                return true

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
                            defaultValue={manga?.slug}
                            slugChecking={slugChecking}
                            value={value}
                            {...props}
                            error={invalid}
                            helperText={error?.message}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="description"
                    rules={{
                        maxLength: 1000
                    }}
                    disabled={ blockedFields.indexOf("description") != -1 }
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
                            disabled={ blockedFields.indexOf("type") != -1 }
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
                            disabled={ blockedFields.indexOf("status") != -1 }
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
                            disabled={ blockedFields.indexOf("year") != -1 }
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
                            disabled={ blockedFields.indexOf("adult") != -1 }
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
                    disabled={ blockedFields.indexOf("genres") != -1 }
                    render={({field: {value, onChange, ...props}}) => (
                        <MangaGenres
                            value={value}
                            onChange={onChange}
                            {...props}
                        />
                    )}
                />
                <Controller 
                    name="promoName"
                    control={control}
                    disabled={ blockedFields.indexOf("promo_name") != -1 }
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
                    disabled={ blockedFields.indexOf("promo_background") != -1 }
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
                    disabled={ blockedFields.indexOf("promo_logo") != -1 }
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