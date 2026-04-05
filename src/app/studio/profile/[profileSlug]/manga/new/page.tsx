"use client"

import EditHeader from "@/features/edit/components/EditHeader";
import EditHeaderNav from "@/features/edit/components/EditHeaderNav";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { useAppSelector } from "@/lib/state/hooks";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import MangaDescription from "@/app/studio/_features/manga/components/MangaDescription";
import { clientFetch } from "@/lib/fetch/clientFetch";
import Manga from "@/types/manga/manga";
import { useRouter } from "next/navigation";
import MangaPoster from "@/features/form/manga/components/MangaPoster";
import MangaName from "@/features/form/manga/components/MangaName";
import MangaType from "@/features/form/manga/components/MangaType";
import MangaStatus from "@/features/form/manga/components/MangaStatus";
import MangaYear from "@/features/form/manga/components/MangaYear";
import MangaAdult from "@/features/form/manga/components/MangaAdult";
import MangaGenres from "@/features/form/manga/components/MangaGenres";
import MangaBackground from "@/features/form/manga/components/MangaBackground";

interface MangaCreateForm {
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

export default function Page() {
    const router = useRouter();

    const profile = useAppSelector(state => state.studioPageProfile.profile)

    const { 
        control, 
        handleSubmit, 
        formState: {
            isValid
        }, 
        reset 
    } = useForm<MangaCreateForm>({
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            type: 1,
            status: 1,
            adult: 1,
            genres: [],
            year: new Date().getFullYear()
        }
    });

    const onSubmit = async (data: MangaCreateForm) => {
        const formData = new FormData();
        
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("type", data.type.toString());
        formData.append("status", data.status.toString());
        formData.append("adult", data.adult.toString());
        formData.append("year", data.year.toString())

        for (const genre of data.genres)
            formData.append("genre", genre.toString());

        data.poster ? formData.append("poster", data.poster) : null;
        data.background ? formData.append("background", data.background) : null;

        const response = await clientFetch.post<Manga>(`/studio/profile/${profile?.slug}/createManga`, {
            body: formData
        })

        router.push(`/studio/manga/${response.data.slug}`)
    }

    if (!profile) return null;

    return (
        <>
            <EditHeader>Создание тайтла</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Link href={`/studio/profile/${profile.slug}/manga`}>
                            <Button
                                variant="outlined"
                            >
                                Отмена
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            disabled={!isValid}
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
        </>
    )
}