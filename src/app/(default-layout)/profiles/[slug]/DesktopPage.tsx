"use client"

import { selectIsSubscribed, selectProfile, selectSection } from "@/lib/state/features/profile-page/page/selectors"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Avatar, Box, Button, Container, Grid, Paper, styled, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material"
import { setSection } from "@/lib/state/features/profile-page/page/slice"
import Wrapper from "./_components/Wrapper"
import WrappedText from "@/components/WrapperTypography"
import ShowMore from "./ShowMore"
import Posts from "./_components/Posts"
import Collections from "./_components/Collections"
import { selectAuthProfile } from "@/features/global/states/auth-profile"
import LinkBlock from "./_components/ProfileLink"



export default function DesktopPage() {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)

    const profile = useAppSelector(selectProfile)
    const section = useAppSelector(selectSection)
    const isSubscribed = useAppSelector(selectIsSubscribed)

    const handleChangeSection = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: "posts" | "collections",
    ) => {
        if (newAlignment)
            dispatch(setSection(newAlignment));
    }

    if (!profile) return

    return (
        <Container maxWidth="lg"
            sx={{
                containerType: "inline-size" 
            }}
        >
            <Wrapper
                sx={{
                    mt: 1,

                    position: "sticky",
                    top: "calc(2*(-100cqi / 9) + 2 * 54px)",
                }}
            />
            <Grid 
                container 
                columns={8} 
                spacing={3}
                sx={{
                    marginTop: "-54px"
                }}
            >
                <Grid size={2}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                            rowGap: 4,

                            position: "sticky",
                            top: "64px"
                        }}
                    >
                        <Avatar 
                            src={profile.avatar}
                            sx={{
                                width: "128px",
                                height: "128px"
                            }}
                        />
                        <Box
                            sx={{
                                textAlign: "center"
                            }}
                        >
                            <Typography variant="caption">
                                @{profile.slug}
                            </Typography>
                            <Typography variant="h2" lineHeight={1}>
                                {profile.name}
                            </Typography>
                            
                        </Box>
                        {authProfile && authProfile.id == profile.id ?
                            <Button variant="contained" color="secondary" fullWidth>
                                Редактировать
                            </Button>
                            :
                            <>
                                {isSubscribed ? 
                                    <Button variant="contained" color="secondary" fullWidth>
                                        Отписаться
                                    </Button>
                                    :
                                    <Button variant="contained" color="primary" fullWidth>
                                        Подписаться
                                    </Button>
                                }
                            </>
                        }
                        <Paper
                            sx={{
                                width: "100%",
                                borderRadius: 2
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    px: 2,
                                    pt: 2
                                }}
                            >
                                Описание
                            </Typography>
                            <Box
                                sx={{
                                    px: 2,
                                    py: 1
                                }}
                            >
                                {profile.about ? 
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1
                                        }}
                                    >
                                        <WrappedText lines={4}>{profile.about}</WrappedText>
                                        <ShowMore />
                                    </Box>
                                    :
                                    <Typography variant="caption">
                                        Нет описания
                                    </Typography>
                                }
                            </Box>
                        </Paper>
                        {profile.links.length > 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    rowGap: 1,
                                    columnGap: 1,
                                    flexWrap: "wrap"
                                }}
                            >
                                {profile.links.map(link => (
                                    <LinkBlock link={link} key={`profile_page_link_${link.name}`}/>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Grid size={6}>
                    <ToggleButtonGroup
                        value={section}
                        exclusive
                        onChange={handleChangeSection}
                        sx={{
                            my: 2,
                            bgcolor: "background.default",

                            position: "sticky",
                            top: "64px"
                        }}
                    >
                        <ToggleButton value={"posts"}>
                            Посты
                        </ToggleButton>
                        <ToggleButton value={"collections"}>
                            Коллекции
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Box
                        sx={{
                            py: 3
                        }}
                    >
                        {section == "posts" && (
                            <Posts />
                        )}
                        {section == "collections" && (
                            <Collections />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}