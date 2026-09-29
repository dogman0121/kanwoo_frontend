import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material"
import Header from "./ui/Header"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import FormContainer from "./ui/FormContainer"
import { chooseProfile, selectProfiles, setSection } from "@/features/global/states/auth/slice"
import { AuthSection } from "@/features/auth/types"
import { Profile } from "@/types/profile"
import { useRouter } from "next/navigation"

function ProfileItemButton({profile, onClick}: {profile: Profile, onClick: () => void}) {
    const theme = useTheme()

    return (
        <ListItemButton
            onClick={onClick}
            // sx={[{
            //         borderRadius: "10px",
            //     },
            //     {
            //         bgcolor: theme.palette.grey[100],
            //         "&:hover": {
            //             bgcolor: theme.palette.grey[200]
            //         }
            //     },
            //     theme.applyStyles("dark", {
            //         bgcolor: theme.palette.grey[800],
            //         "&:hover": {
            //             bgcolor: theme.palette.grey[700]
            //         }
            //     })
            // ]}
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

export default function ProfileChoose() {
    const dispatch  = useAppDispatch()

    const profiles = useAppSelector(selectProfiles)

    const handleChooseProfile = (profileId: number) => {
        dispatch(chooseProfile(profileId))

        location.reload()
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
                <List>
                    {profiles.map(profile => (
                        <ProfileItemButton 
                            key={`auth_profile_${profile.id}`}
                            profile={profile}
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