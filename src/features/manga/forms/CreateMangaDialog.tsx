import { clientFetch } from "@/lib/fetch/client-fetch.util";
import AdminManga from "@/types/admin/manga/manga";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import AppSnackbar from "@/components/AppSnackbar";
import MangaPoster from "@/features/form/manga/components/MangaPoster";
import MangaName from "@/features/form/manga/components/MangaName";
import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import MangaNameTranslations from "@/features/form/manga/components/MangaNameTranslations";
import promiseDebounce from "@/lib/promise-debounce.util";
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
import MangaYear from "@/features/form/manga/components/MangaYear";

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

export function convertSchemaToFormData(data: MangaFormSchema) {
    const formData = new FormData();
                
    formData.append("slug", data.slug);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("nameTranslations", JSON.stringify(data.nameTranslations));
    formData.append("type", data.type.toString());
    formData.append("status", data.status.toString());
    formData.append("adult", data.adult.toString());
    formData.append("year", data.year.toString())
    formData.append("privacy", data.privacy.toString())

    // setting genres
    for (const genre of data.genres)
        formData.append("genre", genre.toString());
    if (data.poster)
        formData.append("poster", data.poster);
    if (data.background)
        formData.append("background", data.background);
    if (data.promoName)
        formData.append("promo_name", data.promoName);
    if (data.promoLogo)
        formData.append("promo_logo", data.promoLogo);
    if (data.promoBackground)
        formData.append("promo_background", data.promoBackground);

    return formData
}

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


export default function CreateMangaDialog({
    open, 
    onClose,
    onSend,
    ...props
}: DialogProps & {onSend: (data: MangaFormSchema) => void}) {

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
    
    const { 
        formState: {
            isValid,
        },
        handleSubmit,
        control,
        reset
    } = useForm<MangaFormSchema>({
        mode: "onChange",
        defaultValues: getFormDefaultValues()
    });
    

    const [slugChecking, setSlugChecking] = useState(false)

    const validateSlugRef = useRef(promiseDebounce(async (value) => {
        const res = await validateSlug(value)

        return res;
    }, 500))

    const onSubmit = (data: MangaFormSchema) => {
        try {
            onSend(data)

            setSuccessSnackbarOpen(true)
        } catch(e) {
            setErrorSnackbarOpen(true)
        }
    }

    useEffect(() => {
        return () => {
            reset()
        }
    }, [open])

    return (
        <>
            <Dialog
                open={open} 
                {...props}
                sx={{
                    "&  .MuiDialog-paper": {
                        maxWidth: "800px",
                        width: "100%",
                        height: "80%",   
                    }
                }}
            >
                <DialogTitle>Создание манги</DialogTitle>
                <DialogContent>
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
                                            setSlugChecking(true)

                                            const res = await validateSlugRef.current(value)

                                            return res
                                        }
                                        finally {
                                            setSlugChecking(false)
                                        }
                                    }
                                }}
                                render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                                    <MangaSlug 
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
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => onClose?.({}, "backdropClick")}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        form="manga-info"
                        disabled={!isValid}
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                variant="success"
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message="Манга успешно добавлена"
            />
            <AppSnackbar 
                variant="error"
                open={errorSnackbarOpen}
                onClose={() => setErrorSnackbarOpen(false)}
                message="При добавлении манги произошла ошибка"
            />
        </> 
    )
}