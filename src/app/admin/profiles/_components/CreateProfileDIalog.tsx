import AppSnackbar from "@/components/AppSnackbar";
import ProfileAvatarCircleInput from "@/features/profile/profileAvatar/components/ProfileAvatarCircleInput";
import ProfileSlugInput from "@/features/profile/profileSlug/components/profileSlugInput";
import useProfileSlugValidator from "@/features/profile/profileSlug/hooks/useProfileSlugValidator";
import { clientFetch } from "@/lib/fetch/clientFetch";
import Profile from "@/types/profile/profile";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface CreateProfileForm {
    avatar: null | File,
    slug: string,
    name: string
}

export default function CreateProfileDialog({open, onClose, ...props}: DialogProps) {

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

    const {reset, control, setError, clearErrors, handleSubmit, formState: {isValid}} = useForm<CreateProfileForm>({
        mode: "onChange",
        defaultValues: {
            avatar: null,
            slug: "",
            name: ""
        }
    })

    const { valid, checking, validateSlug } = useProfileSlugValidator();

    useEffect(() => {
        if (!valid)
            setError("slug", {message: "Данный тег команды занят"})
        else
            clearErrors("slug")
        
        return () => {

        }
    }, [valid])

    useEffect(() => {
        reset()
    }, [open])


    const onSubmit = async (data: CreateProfileForm) => {
        const formData = new FormData();

        if (data.avatar)
            formData.append("avatar", data.avatar)

        formData.append("slug", data.slug)
        formData.append("name", data.name)

        try {
            await clientFetch.post<Profile>("/admin/profiles", {
                body: formData
            })

            setSuccessSnackbarOpen(true)
            onClose?.({}, "backdropClick")
        } catch (_) {
            setErrorSnackbarOpen(true)
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                {...props}
            >
                <DialogTitle>
                    Создание профиля
                </DialogTitle>
                <DialogContent>
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
                                    }
                                }}
                                render={({field, fieldState: {error}}) => (
                                    <ProfileSlugInput
                                        label="Тег"
                                        fullWidth
                                        slugChecking={checking}
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
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => onClose?.({}, "backdropClick")}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        form="create-profile"
                        variant="contained"
                        disabled={!isValid && !checking}
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                variant="error"
                message="При отправке запроса произошла ошибка"
                open={errorSnackbarOpen}
                onClose={() => setErrorSnackbarOpen(false)}
            />
            <AppSnackbar 
                variant="success"
                message="Профиль успешно добавлен"
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
            />
        </>
    )
}