import ProfileAvatarCircleInput from "@/features/profile/profileAvatar/components/ProfileAvatarCircleInput";
import ProfileSlugInput from "@/features/profile/profileSlug/components/profileSlugInput";
import { validateSlug } from "@/features/profile/ui/SlugInput";
import { clientFetch } from "@/lib/fetch/clientFetch";
import promiseDebounce from "@/lib/promiseDebounce";
import Profile from "@/types/profile/profile";
import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Control, Controller, useForm, UseFormHandleSubmit } from "react-hook-form";

export interface CreateProfileForm {
    avatar: null | File,
    slug: string,
    name: string
}

export default function ProfileForm ({
    onSend,
    control,
    handleSubmit,
    profile
}: {
    onSend: (data: CreateProfileForm) => void,
    control: Control<CreateProfileForm>,
    handleSubmit: UseFormHandleSubmit<CreateProfileForm>,
    profile?: Profile
}) {

    const [profileSlugChecking, setProfileSlugChecking] = useState(false)
    
    const validateProfileSlug = useRef(promiseDebounce(async (value) => {
        const res = await validateSlug(value)

        return res
    }, 500))

    const onSubmit = (data: CreateProfileForm) => {
        onSend(data)
    }

    return (
        <form id="create-profile" onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    rowGap: 3
                }}
            >
                <Controller 
                    name="avatar"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <ProfileAvatarCircleInput 
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller 
                    name="slug"
                    control={control}
                    rules={{
                        required: true,
                        validate: async (value: string) => {
                            validateSlug(value)

                            return true
                        }
                    }}
                    render={({field, fieldState: {error}}) => (
                        <ProfileSlugInput
                            label="Тег"
                            fullWidth
                            slugChecking={profileSlugChecking}
                            error={error && true}
                            helperText={error?.message}
                            {...field}
                        />
                    )}
                />
                <Controller 
                    name="name"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field}) => (
                        <TextField 
                            label="Название"
                            fullWidth
                            {...field}
                        />
                    )}
                />
            </Box>
        </form>
    )
}