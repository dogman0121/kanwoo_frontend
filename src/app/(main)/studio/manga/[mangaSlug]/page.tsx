"use client"

import EditHeader from "@/features/edit/components/EditHeader";
import EditHeaderNav from "@/features/edit/components/EditHeaderNav";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { setStudioPageManga } from "@/lib/state/features/studioPage/studioPageMangaSlice";
import FileAction from "@/types/fileAction";
import { Box, Button, Grid } from "@mui/material";
import { notFound, useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import MangaPoster from "../../_features/manga/components/MangaPoster";
import MangaName from "../../_features/manga/components/MangaName";
import MangaNameTranslations from "../../_features/manga/components/MangaNameTranslations";
import { throttle } from "lodash";
import MangaSlug, { validateSlug } from "../../_features/manga/components/MangaSlug";
import MangaDescription from "../../_features/manga/components/MangaDescription";
import MangaType from "../../_features/manga/components/MangaType";
import MangaStatus from "../../_features/manga/components/MangaStatus";
import MangaYear from "../../_features/manga/components/MangaYear";
import MangaGenres from "../../_features/manga/components/MangaGenres";
import MangaAdult from "../../_features/manga/components/MangaAdult";
import MangaBackground from "../../_features/manga/components/MangaBackground";
import MangaPromoName from "../../_features/manga/components/MangaPromoName";
import MangaPromoBackground from "../../_features/manga/components/MangaPromoBackground";
import MangaPromoLogo from "../../_features/manga/components/MangaPromoLogo";
import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { GetStudioMangaEditData } from "@/app/api/studio/manga/[mangaSlug]/getEditData/route";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import MangaEditData from "@/types/manga/mangaEditData";
import Manga from "@/types/manga/manga";

interface MangaEditForm {
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

function compileAction(file: File | string | null) {
    if (file instanceof File)
        return "update"
    else if (file == null)
        return "delete"
    else
        return "keep"
}

function convertToForm(manga?: MangaEditData | null) {
    return {
        name: manga?.name || "",
        slug: manga?.slug || "",
        description: manga?.description || "",
        nameTranslations: manga?.name_translations.map(l => (
            {lang: l.lang.id, name: l.name}
        )) || [],
        type: manga?.type?.id || 1 ,
        status: manga?.status?.id || 1,
        adult: manga?.adult?.id || 1,
        genres: manga?.genres.map(genre => genre.id) || [],
        year: manga?.year || new Date().getFullYear(),
        background: manga?.background,
        poster: manga?.poster?.medium || null,
        promoBackground: manga?.promo_background || null,
        promoName: manga?.promo_name || null,
        promoLogo: manga?.promo_logo || null,
        privacy: manga?.privacy?.id || 1
    }
}


export default function Page() {
    const dispatch = useAppDispatch()

    const {mangaSlug} = useParams()

    const router = useRouter()

    const manga = useAppSelector(state => state.studioPageManga.manga)
    const mangaPermission = useAppSelector(state => state.studioPageManga.mangaPermission)

    const [mangaData, setMangaData] = useState<MangaEditData | null>(null)
    const [blockedFields, setBlockedFields] = useState<string[]>([])

    const [slugChecking, setSlugChecking] = useState(false);

    const { 
        control, 
        handleSubmit, 
        formState: {
            isValid, 
            isDirty, 
            defaultValues
        }, 
        reset 
    } = useForm<MangaEditForm>({
        mode: "onChange",
        defaultValues: convertToForm(mangaData)
    });

    useEffect(() => {
        clientFetch.get<GetStudioMangaEditData>(`/studio/manga/${mangaSlug}/getEditData`)
            .then((response) => {
                setMangaData(response.data)
                setBlockedFields(response.metadata.blocked_fields as string[])

                reset(convertToForm(response.data))
            })
    }, [])

    const onSubmit = async (data: MangaEditForm) => {
        if (!mangaData)
            return;

        const posterAction: FileAction = compileAction(data.poster);
        const backgroundAction: FileAction = compileAction(data.background);
        const promoNameAction: FileAction = compileAction(data.promoName);
        const promoLogoAction: FileAction = compileAction(data.promoLogo);
        const promoBackgroundAction: FileAction = compileAction(data.promoBackground);

        const formData = new FormData();
            
        formData.append("slug", data.slug);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("nameTranslations", JSON.stringify(data.nameTranslations));
        formData.append("type", data.type.toString());
        formData.append("status", data.status.toString());
        formData.append("adult", data.adult.toString());
        formData.append("year", data.year.toString())

        // setting genres
        for (const genre of data.genres)
            formData.append("genre", genre.toString());

        if (data.poster && posterAction == "update")
            formData.append("poster", data.poster);
        formData.append("posterAction", posterAction);
        
        if (data.background && backgroundAction == "update")
            formData.append("background", data.background);
        formData.append("backgroundAction", backgroundAction);
        
        if (data.promoName && promoNameAction == "update")
            formData.append("promoName", data.promoName);
        formData.append("promoNameAction", promoNameAction);
        
        if (data.promoLogo && promoLogoAction == "update")
            formData.append("promoLogo", data.promoLogo);
        formData.append("promoLogoAction", promoLogoAction);
        
        if (data.promoBackground && promoBackgroundAction == "update")
            formData.append("promoBackground", data.promoBackground);
        formData.append("promoBackgroundAction", promoBackgroundAction);

        const response = await clientFetch.post<Manga>(`/studio/manga/${mangaData.slug}/updateManga`, {
            body: formData
        })

        dispatch(setStudioPageManga(response.data))

        router.replace(`/studio/manga/${response.data.slug}`)

        reset(data)
    }

    // if (!mangaPermission || !mangaPermission.edit)
    //     return notFound()
    
    return (
        <Box
            sx={{
                width: "100%"
            }}
        >
            <EditHeader>Основная информация</EditHeader>
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
                            form="manga-info"
                        >
                            Сохранить
                        </Button>
                    </>
                }
            />
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
        </Box>
    )
}