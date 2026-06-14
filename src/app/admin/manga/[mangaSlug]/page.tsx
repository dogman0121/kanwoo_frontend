"use client"

import { notFound, useParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminManga from "@/types/admin/manga/manga";
import { EditPageHeader, EditPageNavbar, EditPageTitle } from "@/features/edit/components/EditHeader";
import { Box, Breadcrumbs, Button, Grid, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { useEffect, useRef, useState } from "react";
import { getDefaultValues } from "@/features/form/manga/Create";
import FileAction from "@/types/fileAction";
import compileFileAction from "@/utils/compileFileAction";
import MangaPoster from "@/features/form/manga/components/MangaPoster";
import MangaName from "@/features/form/manga/components/MangaName";
import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import MangaNameTranslations from "@/features/form/manga/components/MangaNameTranslations";
import MangaSlug, { validateSlug } from "@/features/form/manga/components/MangaSlug";
import MangaDescription from "@/features/form/manga/components/MangaDescription";
import MangaType from "@/features/form/manga/components/MangaType";
import MangaStatus from "@/features/form/manga/components/MangaStatus";
import MangaAdult from "@/features/form/manga/components/MangaAdult";
import MangaGenres from "@/features/form/manga/components/MangaGenres";
import MangaBackground from "@/features/form/manga/components/MangaBackground";
import MangaPromoName from "@/features/form/manga/components/MangaPromoName";
import MangaPromoBackground from "@/features/form/manga/components/MangaPromoBackground";
import MangaPromoLogo from "@/features/form/manga/components/MangaPromoLogo";
import promiseDebounce from "@/lib/promiseDebounce";
import MangaYear from "@/features/form/manga/components/MangaYear";

function getFormDefaultValues() {
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

function getFormData(manga: AdminManga) {
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

interface MangaFormSchema {
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


function compileFormIntoFormData(data: MangaFormSchema) {
    const formData = new FormData();
    
    const posterAction: FileAction = compileFileAction(data.poster);
    const backgroundAction: FileAction = compileFileAction(data.background);
    const promoNameAction: FileAction = compileFileAction(data.promoName);
    const promoLogoAction: FileAction = compileFileAction(data.promoLogo);
    const promoBackgroundAction: FileAction = compileFileAction(data.promoBackground);
        
    formData.append("slug", data.slug);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("name_translations", JSON.stringify(data.nameTranslations));
    formData.append("type", data.type.toString());
    formData.append("status", data.status.toString());
    formData.append("adult", data.adult.toString());
    formData.append("year", data.year.toString())
    formData.append("poster_action", posterAction);
    formData.append("background_action", backgroundAction);
    formData.append("promo_name_action", promoNameAction);
    formData.append("promo_logo_action", promoLogoAction);
    formData.append("promo_background_action", promoBackgroundAction);
    formData.append("privacy", data.privacy.toString())

    // setting genres
    data.genres.forEach((genre: number) => formData.append("genre", genre.toString()))

    if (data.poster && posterAction == "update")
        formData.append("poster", data.poster);
    
    if (data.background && backgroundAction == "update")
        formData.append("background", data.background);
    
    if (data.promoName && promoNameAction == "update")
        formData.append("promo_name", data.promoName);
    
    if (data.promoLogo && promoLogoAction == "update")
        formData.append("promo_logo", data.promoLogo);
    
    if (data.promoBackground && promoBackgroundAction == "update")
        formData.append("promo_background", data.promoBackground);

    return formData
}

export default function Page() {
    const theme = useTheme()

    const { mangaSlug } = useParams()

    const [mangaSlugChecking, setMangaSlugChecking] = useState(false);

    const [manga, setManga] = useState<AdminManga | null>(null)

    const validateMangaSlugRef = useRef(promiseDebounce(async (value) => {
        const res = validateSlug(value)

        return res
    }, 500))

    const { 
        reset,
        formState: {
            isValid,
            isDirty
        },
        handleSubmit,
        control,
    } = useForm<MangaFormSchema>({
        mode: "onChange",
        defaultValues: getDefaultValues()
    });

    useEffect(() => {
        clientFetch.get<AdminManga>(`/admin/manga/${mangaSlug}`)
            .then(resp => {
                if (!resp.data) return notFound()
                
                reset(getFormData(resp.data))
                setManga(resp.data)
            })
    }, [])

    useEffect(() => {
        if (!manga) return;
        
        reset(getFormData(manga))
    }, [manga])

    const onSubmit = async(data: MangaFormSchema) => {
        const formData = compileFormIntoFormData(data)

        const {data: updatedManga} = await clientFetch.post<AdminManga>(
            `/admin/manga/${mangaSlug}/update`,
            {
                body: formData
            }
        ) 

        reset(getFormData(updatedManga))
    }

    if (!manga) return;
    
    return (
        <>
            <EditPageHeader>
                <Breadcrumbs>
                    <Link href={ROUTES.ADMIN.MANGA.MAIN}>
                        Манга
                    </Link>
                    <Typography>
                        {manga.name}
                    </Typography>
                </Breadcrumbs>
                <EditPageTitle>Редактирование манги</EditPageTitle>
            </EditPageHeader>
            <EditPageNavbar
                sticky
                sx={{
                    gap: theme.spacing(2)
                }}
            >
                <Button
                    variant="outlined"
                    disabled={!isDirty}
                    onClick={() => reset(getFormData(manga))}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    disabled={!isDirty || !isValid}
                    type="submit"
                    form="manga-info"
                >
                    Сохранить
                </Button>
            </EditPageNavbar>
            <form id="manga-info" onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
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
                            validate: async (value) => {
                                try {
                                    setMangaSlugChecking(true)

                                    const res = await validateMangaSlugRef.current(value)

                                    return res
                                }
                                finally {
                                    setMangaSlugChecking(false)
                                }
                            }
                        }}
                        render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                            <MangaSlug 
                                slugChecking={mangaSlugChecking}
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
                </Box>
            </form>
        </>
    )
}