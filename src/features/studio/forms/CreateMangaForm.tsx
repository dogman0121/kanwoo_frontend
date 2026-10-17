import { Controller, useForm, UseFormReturn } from "react-hook-form"
import MangaPoster from "../../manga/forms/components/MangaPoster"
import MangaName from "../../manga/forms/components/MangaName"
import MangaDescription from "../../manga/forms/components/MangaDescription"
import { Box, Grid } from "@mui/material"
import MangaType from "../../manga/forms/components/MangaType"
import MangaStatus from "../../manga/forms/components/MangaStatus"
import MangaYear from "../../manga/forms/components/MangaYear"
import MangaAdult from "../../manga/forms/components/MangaAdult"
import MangaGenres from "../../manga/forms/components/MangaGenres"
import MangaBackground from "../../manga/forms/components/MangaBackground"
import { Manga } from "../../manga/types"
import { useState } from "react"
import AppSnackbar from "@/components/AppSnackbar"
import PrivacySelect, { Privacy } from "@/components/PrivacySelect"
import { studioClientAPI } from "../api/client.api"
import { useAppSelector } from "@/lib/state/hooks"
import { selectProfile } from "../states/profile/page.slice"
import { StudioManga } from "../types/studio-manga.type"

export function getDefaultValues() {
    return {
        name: "",
        description: "",
        type: 1,
        status: 1,
        adult: 1,
        genres: [],
        year: new Date().getFullYear()
    }
}

export interface MangaCreateFormSchema {
    name: string,
    privacy: number,
    description: string,
    year: number,
    type: number,
    status: number,
    adult: number,
    genres: number[],
    poster: File,
    background: File
}

export function convertFormToFormData(data: MangaCreateFormSchema) {
    const formData = new FormData()

    formData.set("name", data.name)
    formData.set("privacy_id", data.privacy.toString())
    formData.set("description", data.description)
    formData.set("year", data.year.toString())
    formData.set("type_id", data.type.toString())
    formData.set("status_id", data.status.toString())
    formData.set("adult_id", data.adult.toString())

    for (let g of data.genres) {
        formData.set("genre_id", g.toString())
    }

    formData.set("poster", data.poster)
    formData.set("background", data.background)

    return formData
}

export function useCreateForm() {
    const props = useForm<MangaCreateFormSchema>({
        mode: "onChange",
        defaultValues: getDefaultValues()
    });

    return props
}

export default function CreateMangaForm({
    onCreate,
    onError,
    control,
    handleSubmit,
    reset
}: {
    onCreate?: (manga: StudioManga) => void,
    onError?: () => void
} & UseFormReturn<MangaCreateFormSchema>) {

    const profile = useAppSelector(selectProfile)

    const onSubmit = async (data: MangaCreateFormSchema) => {
        if (!profile) return

        try {
            const formData = convertFormToFormData(data)

            const response = await studioClientAPI.createManga(profile.slug, formData)

            onCreate?.(response.data)
            reset()
        } catch (_) {
            onError?.()
        }
    }

    return (
        <>
            <form id="manga-info" onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 3
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
                    {/* <Controller 
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
                    /> */}
                    {/* <Controller 
                        control={control}
                        name="slug"
                        rules={{
                            required: "Это поле не должно быть пустым",
                            validate: throttle(async (value) => {
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
                                {...props}
                                error={invalid}
                                helperText={error?.message}
                            />
                        )}
                    /> */}
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
                    {/* <Controller 
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
                    /> */}
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
                </Box>
            </form>
        </>
    )
}