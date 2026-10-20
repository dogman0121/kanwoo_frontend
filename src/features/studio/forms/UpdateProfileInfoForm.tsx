import { Box } from "@mui/material";
import { Profile } from "@/features/profile/types/profile.type";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { useRouter } from "next/navigation";
import { studioClientAPI } from "../api/client.api";
import { selectProfile, setStudioProfile } from "@/features/studio/states/profile/page.slice";
import { selectAuthProfile } from "@/features/global/states/auth-profile";
import { setAuthProfile } from "@/features/global/states/auth-profile/auth-profile.slice";
import { routes, toHref } from "@/constants/routes/main.routes";
import { useEffect } from "react";
import ProfileAvatar from "../components/ui/profile/Avatar";
import ProfileName from "../components/ui/profile/Name";
import { throttle } from "lodash";
import useSlugValidator from "@/features/profile/hooks/use-slug-validator.hook";
import ProfileSlug from "../components/ui/profile/ProfileSlug";
import ProfileAbout from "../components/ui/profile/About";
import ProfileLinks from "../components/ui/profile/Links";


const convertIntoForm = (profile: Profile) => {
    return {
        avatar: profile.avatar,
        slug: profile.slug,
        name: profile.name,
        about: profile.about,
        links: profile.links
    }
}

const prepareAvatar = (avatar: string | File | null) => {
    let avatarAction: "update" | "keep" | "delete";

    if (avatar instanceof File)
        avatarAction = "update"
    else if (avatar == null)
        avatarAction = "delete"
    else
        avatarAction = "keep"

    return avatarAction
}

export interface ProfileUpdateInfoFormSchema {
    slug: string
    name: string,
    avatar: File | string | null,
    about: string,
    links: {name: string, link: string}[]
}

export const useUpdateProfileInfoForm = (profile?: Profile | null) => {
    const {reset, ...props} = useForm<ProfileUpdateInfoFormSchema>({
        mode: "onChange",
        defaultValues: {
            avatar: null,
            slug: "",
            name: "",
            about: "",
            links: []
        }
    });

    useEffect(() => {
        if (profile)
            reset(convertIntoForm(profile))
    }, [profile])

    return {
        reset,
        ...props
    }
}

export function convertFormIntoFormData(data: ProfileUpdateInfoFormSchema) {
    const formData = new FormData()

    formData.set("name", data.name)
    formData.set("slug", data.slug)
    formData.set("avatar_action", prepareAvatar(data.avatar))
    formData.set("about", data.about)
    formData.set("links", JSON.stringify(data.links))
    
    if (data.avatar)
        formData.set("avatar", data.avatar)

    return formData
}

export default function UpdateProfileInfoForm({
    control,
    handleSubmit,
    onUpdate 
}: {
    onUpdate?: (data: ProfileUpdateInfoFormSchema) => void
} & ReturnType<typeof useUpdateProfileInfoForm>) {
    const {validating, isValid, validate} = useSlugValidator()

    const handleCreate = (data: ProfileUpdateInfoFormSchema) => {
        onUpdate?.(data)
    }

    return (
        <form id="profile-info" onSubmit={handleSubmit(handleCreate)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
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
                        validate: async (value) => {
                            validate(value)
        
                            return true
                        }
                    }}
                    render={({field: {value, ...props}, fieldState: {error}, formState}) => (
                        <ProfileSlug
                            defaultValue={formState.defaultValues?.["slug"]}
                            slugChecking={validating}
                            error={formState.defaultValues?.["slug"] != value && !validating && !isValid}
                            helperText={formState.defaultValues?.["slug"] != value && !validating && !isValid ? "Данный тег занят" : error?.message}
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
            </Box>
        </form>
    )
}