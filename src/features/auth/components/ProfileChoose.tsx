import { Alert, Avatar, Button, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"
import Header from "./ui/Header"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import FormContainer from "./ui/FormContainer"
import { chooseProfile, selectProfiles, setSection } from "@/features/auth/states/auth/slice"
import { AuthSection } from "@/features/auth/types"
import { Profile } from "@/types/profile"
import { useState, useTransition } from "react"

function ProfileItemButton({profile, onClick, disabled}: {profile: Profile, onClick: () => void, disabled: boolean}) {
    return (
        <ListItemButton
            onClick={onClick}
            disabled={disabled}
            sx={{
                borderRadius: 1,
            }}
        >
            <ListItemAvatar>
                <Avatar src={profile.avatar}/>
            </ListItemAvatar>
            <ListItemText>
                <Typography>{profile.name}</Typography>
            </ListItemText>
        </ListItemButton>
    )
}

export default function ProfileChoose({
    onSuccess
}: {
    onSuccess?: () => void
}) {
    const dispatch  = useAppDispatch()

    const profiles = useAppSelector(selectProfiles)

    const [isChoosing, startChoosing] = useTransition()
    const [chooseFailed, setChooseFailed] = useState(false)

    const handleChooseProfile = (profileId: number) => {
        if (isChoosing) return

        setChooseFailed(false)

        startChoosing(async () => {
            try {
                await dispatch(chooseProfile(profileId)).unwrap()
            } catch {
                setChooseFailed(true)
                return
            }

            location.reload()
        })
    }

    return (
        <>
            <Header 
                label="Выбор профиля" 
                startAdornment={
                    <IconButton onClick={() => dispatch(setSection(AuthSection.LOGIN))}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                }
            />
            <FormContainer>
                {chooseFailed && <Alert severity="error">Не удалось выбрать профиль. Попробуйте ещё раз.</Alert>}
                <List>
                    {profiles.map(profile => (
                        <ProfileItemButton 
                            key={`auth_profile_${profile.id}`}
                            profile={profile}
                            disabled={isChoosing}
                            onClick={() => handleChooseProfile(profile.id)}
                        />
                    ))}
                </List>
            </FormContainer>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => dispatch(setSection(AuthSection.CREATE_PROFILE))}
                sx={{
                    mt: 4
                }}
            >
                Создать
            </Button>
        </>
    )
}
