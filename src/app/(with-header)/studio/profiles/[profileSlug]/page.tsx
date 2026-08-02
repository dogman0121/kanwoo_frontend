"use client"

import EditPageContainer from "@/features/edit/components/EditPageContainer";
import EditHeader from "@/features/edit/components/EditHeader";
import { profileClientApi } from "@/lib/fetch/features/profile/client";
import { setAuthProfile } from "@/lib/state/features/authProfile/authProfileSlice";
import { setStudioPageProfile } from "@/lib/state/features/studioPage/studioPageProfileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import Profile from "@/types/profile/profile";
import { Box, Button, Divider } from "@mui/material";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ProfileAvatar from "./_components/ProfileAvatar";
import ProfileName from "./_components/ProfileName";
import { throttle } from "lodash";
import ProfileSlug, { validateSlug } from "./_components/ProfileSlug";
import ProfileAbout from "./_components/ProfileAbout";
import ProfileLinks from "./_components/ProfileLinks";
import EditHeaderNav from "@/features/edit/components/EditHeaderNav";
import { studioClientApi } from "@/lib/fetch/features/studio/client";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { ROUTES } from "@/routes";


export interface ProfileInfoForm {
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


export default function Page() {
    const dispatch = useAppDispatch()
    const router = useRouter();

    const [slugChecking, setSlugChecking] = useState(false);

    const profile = useAppSelector(state => state.studioPageProfile.profile)

    const onSubmit = async (data: ProfileInfoForm) => {
        if (!profile)
            return;

        const formData = new FormData()

        let avatarAction: "update" | "keep" | "remove";

        if (data.avatar instanceof File)
            avatarAction = "update"
        else if (data.avatar == null)
            avatarAction = "remove"
        else
            avatarAction = "keep"

        formData.set("name", data.name)
        formData.set("slug", data.slug)
        formData.set("avatar_action", avatarAction)
        formData.set("about", data.about)
        formData.set("links", JSON.stringify(data.links))
        
        if (data.avatar)
            formData.set("avatar", data.avatar)

        try {
            const {data: updatedProfile} = await clientFetch.put<Profile>(`/studio/profiles/${profile.slug}`, {
                body: formData
            })

            dispatch(setStudioPageProfile(updatedProfile))
            dispatch(setAuthProfile(updatedProfile))

            router.replace(ROUTES.STUDIO.PROFILE.MAIN(updatedProfile.slug))

        } catch (_) {
            throw new Error("Failed to update")
        }
    } 

    const { 
        control, 
        handleSubmit, 
        formState: {isValid, isDirty, defaultValues}, 
        reset 
    } = useForm<ProfileInfoForm>({
        mode: "onChange",
        defaultValues: toForm(profile)
    });

    
    useEffect(() => {
        reset(toForm(profile))
    }, [profile])

    if(!profile)
        return null;

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
                            form="profile-info"
                        >
                            Сохранить
                        </Button>
                    </>
                }
            />
            <form id="profile-info" onSubmit={handleSubmit(onSubmit)}>
                <EditPageContainer
                    sx={{
                        paddingTop: "20px",
                        paddingBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "15px"
                    }}
                >
                
                    <Controller
                        control={control}
                        name="avatar"
                        render={({field: {value, onChange}}) => (
                            <ProfileAvatar
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
                            <ProfileName
                                error={invalid}
                                helperText={error?.message}
                                sx={{
                                    mt: "10px"
                                }}
                                {...field}
                            />
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
                                
                                const res = await validateSlug(value);

                                setSlugChecking(false)

                                if (res)
                                    return true
                                else
                                    return "Данный тег профиля занят"
                            }, 500)
                        }}
                        render={({field: {value, ...props}, fieldState: {error, invalid}}) => (
                            <ProfileSlug
                                defaultValue={profile.slug}
                                slugChecking={slugChecking}
                                error={error?.type == "required"}
                                helperText={error?.message}
                                value={value}
                                {...props}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="about"
                        render={({field: {value, ...props}}) => (
                            <ProfileAbout 
                                value={value}
                                {...props}
                            />
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
                            <ProfileLinks
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