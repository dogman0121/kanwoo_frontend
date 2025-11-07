"use client"

import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import EditInput from "@/features/edit/EditInput";
import { Box, Button, Chip, CircularProgress, Divider, Grid, InputAdornment, MenuItem, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { throttle } from "lodash";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { mangaClientApi } from "@/lib/api/features/manga/client";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import NameTranslations from "./NameTranslations";
import EditSelect from "@/features/edit/EditSelect";
import CancelIcon from "@mui/icons-material/Cancel"
import Background from "./Background";
import Poster from "./Poster";
import PromoBackground from "./PromoBackground";
import PromoName from "./PromoName";
import PromoLogo from "./PromoLogo";
import FileAction from "@/types/fileAction";
import { setManga } from "@/lib/state/features/manga/mangaSlice";
import { useRouter } from "next/navigation";
import Manga from "@/types/manga";

interface MangaInfoForm {
    slug: string,
    name: string,
    nameTranslations: {name: string, lang: string}[],
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
}

const MyTabPanel = styled(AppTabPanel)({
    marginTop: "0"
})

const AppTabContainer = styled(Box)({
    padding: "30px 25px",
    display: "flex",
    flexDirection: "column",
    rowGap: "20px"
})

function compileAction(file: File | string | null) {
    if (file instanceof File)
        return "update"
    else if (file == null)
        return "delete"
    else
        return "keep"
}

function toForm(manga?: Manga | null) {
    return {
        name: manga?.name || "",
        slug: manga?.slug || "",
        description: manga?.description || "",
        nameTranslations: manga?.name_translations || [],
        type: manga?.type?.id || 0 ,
        status: manga?.status?.id || 0,
        adult: manga?.adult?.id || 0,
        genres: manga?.genres.map(genre => genre.id) || [],
        year: manga?.year || new Date().getFullYear(),
        background: manga?.background,
        poster: manga?.poster?.medium || null,
        promoBackground: manga?.promo_background || null,
        promoName: manga?.promo_name || null,
        promoLogo: manga?.promo_logo || null,
    }
}

export default function InfoForm() {
    const router = useRouter();

    const dispatch = useAppDispatch()

    const [section, setSection] = useState('1');

    const [slugChecking, setSlugChecking] = useState(false);

    const manga = useAppSelector(state => state.manga.manga)
    
    const meta = useAppSelector(state => state.meta.meta)

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    const { control, handleSubmit, formState: {isValid, isDirty, defaultValues}, reset } = useForm<MangaInfoForm>({
        mode: "onChange",
        defaultValues: toForm(manga)
    });

    const onSubmit = async (data: MangaInfoForm) => {
        if (!manga)
            return;

        const posterAction: FileAction = compileAction(data.poster);
        const backgroundAction: FileAction = compileAction(data.background);
        const promoNameAction: FileAction = compileAction(data.promoName);
        const promoLogoAction: FileAction = compileAction(data.promoLogo);
        const promoBackgroundAction: FileAction = compileAction(data.promoBackground);

        const updateManga = await mangaClientApi.updateManga(
            manga,
            data.slug,
            data.name,
            data.description,
            data.nameTranslations,
            data.type,
            data.status,
            data.adult,
            data.year,
            data.genres,
            (data.poster instanceof File) ? data.poster : undefined,
            posterAction,
            (data.background instanceof File) ? data.background : undefined,
            backgroundAction,
            (data.promoName instanceof File) ? data.promoName : undefined,
            promoNameAction,
            (data.promoLogo instanceof File) ? data.promoLogo : undefined,
            promoLogoAction,
            (data.promoBackground instanceof File) ? data.promoBackground : undefined,
            promoBackgroundAction,
        )

        dispatch(setManga(updateManga))

        router.replace(`/manga/${updateManga.slug}/edit/info`)
    }

    useEffect(() => {
        reset(toForm(manga))
    }, [manga])

    if (!manga)
        return null;

    return (
        <form id="manga-info" onSubmit={handleSubmit(onSubmit)}>
            <AppTabContext 
                value={section}
            >
                <Box
                    sx={{
                        zIndex: 2,
                        position: "sticky",
                        top: "164px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "end",

                            px: "25px",

                            bgcolor: "background.default"
                        }}
                    >
                        <AppTabList onChange={handleChange}>
                            <AppTab value={"1"} label="Главное" />
                            <AppTab value={"2"} label="Промо" />
                        </AppTabList>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "10px",
                                py: "10px"
                            }}
                        >
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
                        </Box>
                    </Box>
                    <Divider />
                </Box>
                    <MyTabPanel
                        value={"1"}
                    >
                        <AppTabContainer>
                            <Controller 
                                control={control}
                                name="name"
                                rules={{
                                    required: "Это поле не должно быть пустым"
                                }}
                                render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                                    <EditInput 
                                        label="Название"
                                        caption="На русском языке"
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
                                    <NameTranslations
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
                                        if (value == manga.slug)
                                            return true

                                        setSlugChecking(true)
                                        
                                        const res = await mangaClientApi.checkMangaSlug(value);

                                        setSlugChecking(false)

                                        if (res)
                                            return true
                                        else
                                            return "Данный тег команды занят"
                                    }, 500)
                                }}
                                render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                                    <EditInput 
                                        label="Тег манги"
                                        caption="Уникальная последовательность из цифр и латинских букв. Используется в url."
                                        value={value}
                                        {...props}
                                        error={invalid}
                                        helperText={error?.message}
                                        slotProps={{
                                            input: {
                                                endAdornment: 
                                                    <InputAdornment position="end">
                                                        {(slugChecking) && (
                                                            <CircularProgress
                                                                size={"20px"}
                                                            />
                                                        ) }
                                                        {(!slugChecking && value != "" && value != manga.slug && !invalid) && (
                                                            <CheckCircleRoundedIcon color="success"/>
                                                        )}
                                                        {(!slugChecking && value != "" && value != manga.slug && invalid) && (
                                                            <ErrorRoundedIcon color="error"/>
                                                        )}
                                                    </InputAdornment>
                                            }
                                        }} 
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
                                    <EditInput 
                                        label="Описание"
                                        caption="Помогает читать о тайтле пользователям. Участвует при поиске информации"
                                        placeholder="Введите описание"
                                        minRows={5}
                                        multiline
                                        value={value}
                                        {...props}
                                        error={invalid}
                                        helperText={error?.type == "maxLength" && "Описание не может быть больше 1000 символов"}
                                        slotProps={{
                                            input: {
                                                endAdornment: 
                                                    <InputAdornment position="end"
                                                        sx={{
                                                            alignSelf: "end"
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                        >
                                                            {value?.length}/1000
                                                        </Typography>
                                                    </InputAdornment>
                                            }
                                        }}
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
                                            <EditSelect
                                                label="Тип"
                                                value={value}
                                                {...props}
                                            >
                                                {meta?.types.map((type) => (
                                                    <MenuItem value={type.id} key={`type_${type.id}`}>
                                                        {type.name}
                                                    </MenuItem>
                                                ))}
                                            </EditSelect>
                                        )}
                                    />
                                </Grid>
                                <Grid size={1}>
                                    <Controller 
                                        name="status"
                                        control={control}
                                        render={({field: {value, ...props}}) => (
                                            <EditSelect
                                                label="Статус"
                                                value={value}
                                                {...props}
                                            >
                                                {meta?.statuses.map((status) => (
                                                    <MenuItem value={status.id} key={`status_${status.id}`}>
                                                        {status.name}
                                                    </MenuItem>
                                                ))}
                                            </EditSelect>
                                        )}
                                    />
                                </Grid>
                                <Grid size={1}>
                                    <Controller 
                                        name="year"
                                        control={control}
                                        render={({field: {value, ...props}}) => (
                                            <EditInput 
                                                label="Год выпуска"
                                                type="number"
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
                                            <EditSelect
                                                value={value}
                                                label="Возрастное ограничение"
                                                {...props}
                                            >
                                                {meta?.adults.map((adult) => (
                                                    <MenuItem value={adult.id} key={`adult_${adult.id}`}>
                                                        {adult.name}
                                                    </MenuItem>
                                                ))}
                                            </EditSelect>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Controller 
                                name="genres"
                                control={control}
                                render={({field: {value, onChange, ...props}}) => (
                                    <EditSelect
                                        label="Жанры"
                                        caption="Помогают при поиске тайтла в каталоге а также в системе рекомендаций"
                                        multiple
                                        value={value}
                                        displayEmpty={true}
                                        onChange={onChange}
                                        renderValue={(selected)=> (
                                            <Box
                                                sx={(theme) => ({ display: "flex", flexWrap: "wrap", gap: theme.spacing(1)})}
                                            >
                                                {(selected as string[]).length !== 0 ?
                                                    <>
                                                        {(selected as string[]).map((option: string) => (
                                                            <Chip 
                                                                key={option} 
                                                                label={meta?.genres.find((item) => item.id == parseInt(option))?.name}
                                                                onDelete={() => onChange((selected as string[]).filter((f: string) => f != option))}
                                                                deleteIcon={
                                                                    <CancelIcon
                                                                        sx={{
                                                                            width: "16px",
                                                                            height: "16px"
                                                                        }}
                                                                        onMouseDown={(event) => {event.stopPropagation(); event.preventDefault()}}
                                                                    />
                                                                }
                                                            />
                                                        ))}
                                                    </>
                                                    :
                                                    <Typography color="darkgray">Выберите значение</Typography>
                                                }
                                            </Box>
                                        )}
                                        {...props}
                                    >
                                        {meta?.genres.map((genre) => (
                                            <MenuItem key={`genre_${genre.id}`} value={genre.id}>{genre.name}</MenuItem>
                                        ))}
                                    </EditSelect>
                                )}
                            />
                            <Controller 
                                name="poster"
                                control={control}
                                render={({field: {value, onChange}}) => (
                                    <Poster 
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <Controller 
                                name="background"
                                control={control}
                                render={({field: {value, onChange}}) => (
                                    <Background 
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </AppTabContainer>
                    </MyTabPanel>
                    <MyTabPanel 
                        value={"2"}
                    >
                        <AppTabContainer>
                            <Controller 
                                name="promoName"
                                control={control}
                                render={({field: {value, onChange}}) => (
                                    <PromoName 
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <Controller 
                                name="promoBackground"
                                control={control}
                                render={({field: {value, onChange}}) => (
                                    <PromoBackground 
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <Controller 
                                name="promoLogo"
                                control={control}
                                render={({field: {value, onChange}}) => (
                                    <PromoLogo 
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </AppTabContainer>
                    </MyTabPanel>
            </AppTabContext>
        </form>
    )
}