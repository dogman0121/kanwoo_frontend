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

export function getDefaultValues() {
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

export interface MangaCreateForm {
    slug: string,
    name: string,
    nameTranslations: {name: string, lang: number}[],
    description: string,
    year: number,
    type: number,
    status: number,
    adult: number,
    genres: number[],
    poster: File,
    background: File, 
    promoBackground: File,
    promoName: File,
    promoLogo: File,
    privacy: number
}

export default function AdminMangaCreateForm({
    onSend,
    control,
    handleSubmit,
}: {
    onSend: (data: MangaCreateForm) => void,
    control: Control<MangaCreateForm>,
    handleSubmit: UseFormHandleSubmit<MangaCreateForm>
}) {
    const [slugChecking, setSlugChecking] = useState(false)

    const onSubmit = (data: MangaCreateForm) => {
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