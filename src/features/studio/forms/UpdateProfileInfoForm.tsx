import { Box } from "@mui/material";
import AvatarInput from "../components/profile/AvatarInput";
import NameInput from "../components/profile/NameInput";
import SlugInput from "../components/profile/SlugInput";
import AboutInput from "../components/profile/AboutInput";
import LinksInput from "../components/profile/LinksInput";
import { Profile } from "@/features/profile/types/profile.type";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { useRouter } from "next/navigation";
import { studioClientAPI } from "../api/client.api";
import { selectProfile, setStudioProfile } from "@/features/studio/states/profile/page.slice";
import { selectAuthProfile } from "@/features/global/states/auth-profile";
import { setAuthProfile } from "@/features/global/states/auth-profile/auth-profile.slice";
import { routes, toHref } from "@/constants/routes/main.routes";
import { useEffect } from "react";


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
    let avatarAction: "update" | "keep" | "remove";

    if (avatar instanceof File)
        avatarAction = "update"
    else if (avatar == null)
        avatarAction = "remove"
    else
        avatarAction = "keep"

    return avatarAction
}

export interface UpdateProfileInfoFormSchema {
    slug: string
    name: string,
    avatar: File | string | null,
    about: string,
    links: {name: string, link: string}[]
}

export const useUpdateProfileInfoForm = (profile?: Profile | null) => {
    const {reset, ...props} = useForm<UpdateProfileInfoFormSchema>({
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

export default function UpdateProfileInfoForm({
    control,
    reset,
    handleSubmit, 
}: ReturnType<typeof useUpdateProfileInfoForm>) {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)
    const profile = useAppSelector(selectProfile)

    console.log(profile)

    const onSubmit = async (data: UpdateProfileInfoFormSchema) => {
        if (!profile)
            return 

        const formData = new FormData()

        formData.set("name", data.name)
        formData.set("slug", data.slug)
        formData.set("avatar_action", prepareAvatar(data.avatar))
        formData.set("about", data.about)
        formData.set("links", JSON.stringify(data.links))
        
        if (data.avatar)
            formData.set("avatar", data.avatar)

        try {
            const {data: updatedProfile} = await studioClientAPI.updateProfileInfo(profile.slug, formData)

            dispatch(setStudioProfile({
                data: updatedProfile
            }))

            if (authProfile?.id == profile.id)
                dispatch(setAuthProfile(updatedProfile))

            reset(convertIntoForm(updatedProfile))
            window.history.replaceState({}, "", toHref(routes.studio.profiles.item, {slug: updatedProfile.slug}))

        } catch (_) {
            throw new Error("Failed to update")
        }
    }

    if (!profile) return

    return (
        <form id="profile-info" onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}
            >
                <AvatarInput control={control}/>
                <NameInput control={control}/>
                <SlugInput 
                    control={control} 
                    defaultValue={profile.slug}
                />
                <AboutInput control={control}/>
                <LinksInput control={control}/>
            </Box>
        </form>
    )
}