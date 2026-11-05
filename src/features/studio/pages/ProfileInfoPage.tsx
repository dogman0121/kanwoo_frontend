import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import EditPageContainer from "@/components/edit/EditPageContainer";
import { routes, toHref } from "@/constants/routes/main.routes";
import { selectAuthProfile } from "@/features/auth/states/auth-profile";
import { setAuthProfile } from "@/features/auth/states/auth-profile/auth-profile.slice";
import { studioClientAPI } from "@/features/studio/api/client.api";
import UpdateProfileInfoForm, { convertFormIntoFormData, ProfileUpdateInfoFormSchema, useUpdateProfileInfoForm } from "@/features/studio/forms/UpdateProfileInfoForm";
import { selectProfile, setStudioProfile, updateProfileInfo } from "@/features/studio/states/profile/page.slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProfileInfoPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const profile = useAppSelector(selectProfile)

    const {formState, reset, ...formProps} = useUpdateProfileInfoForm(profile)

    const handleUpdateProfile = async (data: ProfileUpdateInfoFormSchema) => {
        if (!profile) return

        const { response } = await dispatch(updateProfileInfo({profileSlug: profile.slug, form: data})).unwrap()

        router.replace(toHref(routes.studio.profiles.item, {slug: response.data.slug}))
    }

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
                            disabled={!formState.isDirty}
                            type="reset"
                            onClick={() => reset()}
                        >
                            Отменить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={(!formState.isValid || !formState.isDirty)}
                            type="submit"
                            form="profile-info"
                        >
                            Сохранить
                        </Button>
                    </>
                }
            />
            <EditPageContainer
                sx={{
                    py: 2
                }}
            >
                <UpdateProfileInfoForm 
                    reset={reset}
                    onUpdate={handleUpdateProfile}
                    formState={formState}
                    {...formProps}
                />
            </EditPageContainer>
        </Box>
    )
}