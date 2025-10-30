"use client"

import { AppTab, AppTabContext, AppTabList } from "@/components/AppTabs"
import { 
    Box, 
    Button, 
    CircularProgress, 
    Divider, 
    InputAdornment, styled, TextField, Typography, TypographyProps } from "@mui/material"
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TeamAvatar from "./TeamAvatar";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { throttle } from "lodash";
import { profileClientApi } from "@/lib/api/features/profile/client";
import Links from "./Links";
import { setProfile } from "@/lib/state/features/profile/profileSlice";
import { useRouter } from "next/navigation";
import Profile from "@/types/profile";

export const TextInputLabel = styled(Typography)(() => ({
    fontSize: "16px",
    fontWeight: "600"
}));

export const TextInputCaption = (props: TypographyProps) => (
    <Typography 
        variant="caption"
        {...props}
    />
)

export const TextInput = styled(TextField)(() => ({
    "& input": {
        padding: "10px 14px"
    }
}))

interface ProfileInfoForm {
    slug: string
    name: string,
    avatar: File | string | null,
    about: string,
    links: {name: string, link: string}[]
}

const toForm = (profile: Profile | undefined | null) => {
    return {
        avatar: profile?.avatar || null,
        slug: profile?.slug || "",
        name: profile?.name || "",
        about: profile?.about || "",
        links: profile?.links || []
    }
}

export default function InfoForm() {
    const dispatch = useAppDispatch();

    const router = useRouter()

    const [section, setSection] = useState('1');

    const [slugChecking, setSlugChecking] = useState(false);

    const profile = useAppSelector(state => state.profile.profile)
    
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    const { control, handleSubmit, formState: {isValid, isDirty, defaultValues}, reset } = useForm<ProfileInfoForm>({
        mode: "onChange",
        defaultValues: toForm(profile)
    });

    const onSubmit = async (data: ProfileInfoForm) => {
        if (!profile)
            return;

        let avatarAction: "update" | "keep" | "remove";

        if (data.avatar instanceof File)
            avatarAction = "update"
        else if (data.avatar == null)
            avatarAction = "remove"
        else
            avatarAction = "keep"

        try {
            const updated_profile = await profileClientApi.updateProfile(
                profile,
                data.name,
                data.slug,
                avatarAction,
                data.about,
                data.links,
                (data.avatar instanceof File) ? data.avatar : undefined,
            )

            dispatch(setProfile(updated_profile))

            router.replace(`/profiles/${updated_profile.slug}/edit/info`)

        } catch (_) {
            throw new Error("Failed to update")
        }
    }

    useEffect(() => {
        reset(toForm(profile))
    }, [profile])

    if (!profile)
        return null;

    return (
        <>
            <form id="profile-info" onSubmit={handleSubmit(onSubmit)}>
                <AppTabContext 
                    value={section}
                >
                    <Box
                        sx={{
                            zIndex: 2,
                            position: "sticky",
                            top: "54px",
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
                                    form="profile-info"
                                >
                                    Сохранить
                                </Button>
                            </Box>
                        </Box>
                        <Divider />
                    </Box>
                </AppTabContext>
                <Box
                    sx={{
                        p: "30px 25px"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "20px"
                        }}
                    >
                        <Controller 
                            control={control}
                            name="avatar"
                            render={({field: {value, onChange}}) => (
                                <TeamAvatar
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: "Это поле не должно быть пустым",
                            }}
                            render={({field, fieldState: {invalid, error}}) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <TextInputLabel>Название профиля</TextInputLabel>
                                    <TextInputCaption>
                                        Отображается рядом с аватаром.
                                    </TextInputCaption>
                                    <TextInput
                                        error={invalid}
                                        helperText={error?.message}
                                        sx={{
                                            mt: "10px"
                                        }}
                                        {...field}
                                    />
                                </Box>
                            )}
                        />
                        <Controller
                            control={control}
                            name="slug"
                            rules={{
                                required: "Это поле не должно быть пустым",
                                validate: throttle(async (value) => {
                                    if (value == profile.slug)
                                        return true

                                    setSlugChecking(true)
                                    
                                    const res = await profileClientApi.checkProfileSlug(value);

                                    setSlugChecking(false)

                                    if (res)
                                        return true
                                    else
                                        return "Данный тег профиля занят"
                                }, 500)
                            }}
                            render={({field: {value, ...props}, fieldState: {error, invalid}}) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <TextInputLabel>Тег команды</TextInputLabel>
                                    <TextInputCaption>
                                        Уникальная последовательность из цифр и латинских букв.
                                        Является уникальным идентификатором.
                                    </TextInputCaption>
                                    <TextInput
                                        sx={{
                                            mt: "10px"
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment: 
                                                    <InputAdornment position="end">
                                                        {(slugChecking) && (
                                                            <CircularProgress
                                                                size={"20px"}
                                                            />
                                                        ) }
                                                        {(!slugChecking && value != "" && value != profile.slug && !invalid) && (
                                                            <CheckCircleRoundedIcon color="success"/>
                                                        )}
                                                        {(!slugChecking && value != "" && value != profile.slug && invalid) && (
                                                            <ErrorRoundedIcon color="error"/>
                                                        )}
                                                    </InputAdornment>
                                            }
                                        }} 
                                        error={error?.type == "required"}
                                        helperText={error?.message}
                                        value={value}
                                        {...props}
                                    />
                                </Box>
                            )}
                        />
                        <Controller
                            control={control}
                            name="about"
                            render={({field: {value, ...props}}) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <TextInputLabel>Описание команды</TextInputLabel>
                                    <TextInputCaption>
                                        Помогает читателям узнать о команде побольше. Лучше не прикреплять контактную информацию.
                                    </TextInputCaption>
                                    <TextInput
                                        placeholder="Введите описание"
                                        minRows={5}
                                        multiline
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                flexDirection: "column",
                                                p: "10px 14px 5px"
                                            }
                                        }}
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
                                        value={value || ""}
                                        {...props}
                                    />
                                </Box>
                            )}
                        />
                        <Controller
                            control={control}
                            name="links"
                            rules={{
                                validate: (value) => {
                                    for (const v of value) {
                                        if (v.link == "" || v.name == "")
                                            return false;
                                        
                                        try {
                                            new URL(v.link);
                                        } catch (e) {
                                            return false;
                                        }
                                    }
                                }
                            }}
                            render={({field: {value, onChange}}) => (
                                <Links
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </form>
        </>
    )
}