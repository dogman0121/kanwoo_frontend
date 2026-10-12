import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import EditPageContainer from "@/components/edit/EditPageContainer";
import UpdateProfileInfoForm, { useUpdateProfileInfoForm } from "@/features/studio/forms/UpdateProfileInfoForm";
import { selectProfile } from "@/features/studio/states/profile.slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button } from "@mui/material";

export function DesktopPage() {
    const profile = useAppSelector(selectProfile)

    const {formState, reset, ...formProps} = useUpdateProfileInfoForm(profile)

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
            <EditPageContainer>
                <UpdateProfileInfoForm 
                    reset={reset}
                    formState={formState}
                    {...formProps}
                />
            </EditPageContainer>
        </Box>
    )
}