import { Controller, useForm } from "react-hook-form"
import Header from "./ui/Header"
import FormContainer from "./ui/FormContainer"
import useSlugValidator from "@/features/profile/hooks/use-slug-validator.hook"
import Input from "./ui/Input"
import { Button, IconButton } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { createProfile, selectIsLoading, setSection } from "@/features/global/states/auth/slice"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import { AuthSection } from "@/features/auth/types"
import SlugInput from "@/features/profile/components/SlugInput"


interface CreateProfileForm {
    slug: string,
    name: string
}

export function ProfileCreate() {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector(selectIsLoading)

    const {control, handleSubmit, setError, formState: {errors}} = useForm<CreateProfileForm>({
        mode: "onChange",
        defaultValues: {
            slug: "",
            name: ""
        }
    })
    
    const onSubmit = (data: CreateProfileForm) => {
        dispatch(createProfile({
            slug: data.slug,
            name: data.name
        }))
    }

    const {isValid, validate, validating} = useSlugValidator()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Header 
                label="Создание профиля" 
                startAdornment={
                    <IconButton onClick={() => dispatch(setSection(AuthSection.CHOOSE_PROFILE))}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                }
                />
            <FormContainer>
                <Controller 
                    control={control}
                    name="slug"
                    rules={{
                        validate: (value: string) => {
                            if (value == "") {
                                setError("slug", {message: "Имя пользователя не должно быть пустым"})
                                return
                            }
                            validate(value)

                            return ""
                        }
                    }}
                    render={({field}) => (
                        <SlugInput 
                            label="Тег профиля"
                            type="text"
                            slugChecking={validating}
                            defaultValue={""}
                            error={!isValid || errors.slug != undefined}
                            helperText={!isValid && "Имя пользователя занято"}
                            {...field}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="name"
                    rules={{
                        required: true
                    }}
                    render={({field}) => (
                        <Input
                            label="Отображаемое имя"
                            variant="outlined"
                            fullWidth
                            {...field}
                        />
                    )} 
                />
            </FormContainer>
            <Button
                fullWidth
                variant="contained"
                type="submit"
                loading={isLoading}
                sx={{
                    mt: 4
                }}
            >
                Создать
            </Button>
        </form>
    )
}