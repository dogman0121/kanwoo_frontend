import EditPageContainer from "@/components/edit/EditPageContainer"
import { Controller, UseFormReturn } from "react-hook-form"
import MangaPoster from "./components/MangaPoster"
import MangaName from "./components/MangaName"
import MangaDescription from "./components/MangaDescription"
import { Grid } from "@mui/material"
import MangaType from "./components/MangaType"
import MangaStatus from "./components/MangaStatus"
import MangaYear from "./components/MangaYear"
import MangaAdult from "./components/MangaAdult"
import MangaGenres from "./components/MangaGenres"
import MangaBackground from "./components/MangaBackground"

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

export interface MangaCreateForm {
    name: string,
    description: string,
    year: number,
    type: number,
    status: number,
    adult: number,
    genres: number[],
    poster: File,
    background: File
}

export default function Create({
    onSend,
    control,
    handleSubmit,
    ...props
}: {
    onSend: (data: MangaCreateForm) => void
} & UseFormReturn<MangaCreateForm>) {

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
            </EditPageContainer>
        </form>
    )
}