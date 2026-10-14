import AppPageHeader from "@/components/AppPageHeader";
import { setDrawerOpen } from "@/features/studio/states/studio-page.slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileContainer from "@/components/MobileContainer";
import UpdateProfileInfoForm, { useUpdateProfileInfoForm } from "@/features/studio/forms/UpdateProfileInfoForm";
import { selectProfile } from "@/features/studio/states/profile/page.slice";


export function MobilePage() {
    const dispatch = useAppDispatch()

    const profile = useAppSelector(selectProfile)

    const {formState, reset, ...formProps} = useUpdateProfileInfoForm(profile)

    if (!profile) return null

    return (
        <>
            <AppPageHeader 
                startAdornment={
                    <IconButton
                        onClick={() => dispatch(setDrawerOpen(true))}
                    >
                        <MenuRoundedIcon />
                    </IconButton>
                }
                label="Общая информация"
            />
            <MobileContainer>
                <UpdateProfileInfoForm 
                    formState={formState}
                    reset={reset}
                    {...formProps}
                />
                <Box
                    sx={{
                        mt: 4,

                        display: "flex",
                        flexDirection: "row",
                        gap: 2
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={(!formState.isValid || !formState.isDirty)}
                        type="submit"
                        form="profile-info"
                    >
                        Сохранить
                    </Button>

                    <Button
                        variant="outlined"
                        disabled={!formState.isDirty}
                        type="reset"
                        onClick={() => reset()}
                    >
                        Отменить
                    </Button>
                    
                </Box>
            </MobileContainer>
        </>
    )
}