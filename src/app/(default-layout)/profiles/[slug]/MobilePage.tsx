"use client"

import WestRoundedIcon from '@mui/icons-material/WestRounded';
import Wrapper from "./_components/Wrapper";
import MobileContainer from "@/components/MobileContainer";
import { Avatar, Box, Button, Chip, Container, Icon, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectIsSubscribed, selectProfile, selectSection } from "@/lib/state/features/profile-page/page/selectors";
import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import WrappedText from "@/components/WrapperTypography";
import ShowMore from "./ShowMore";
import Posts from "./_components/Posts";
import Collections from "./_components/Collections";
import { selectAuthProfile } from '@/features/global/states/auth-profile';
import AppPageHeader, { BackButton } from '@/components/AppPageHeader';
import { SyntheticEvent, useState } from 'react';
import { setSection } from '@/lib/state/features/profile-page/page/slice';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Options from './_components/mobile/Options';
import LinkBlock from './_components/ProfileLink';

export default function MobilePage() {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)

    const isSubscribed = useAppSelector(selectIsSubscribed)
    const profile = useAppSelector(selectProfile)

    const [optionsOpen, setOptionsOpen] = useState(false)

    const section = useAppSelector(selectSection)

    const handleChangeSection = (_event: SyntheticEvent, value: "posts" | "collections") => {
        dispatch(setSection(value))
    }

    if (!profile) return

    return (
        <>
            <AppPageHeader 
                startAdornment={
                    <BackButton />
                }
                endAdornment={
                    <IconButton onClick={() => setOptionsOpen(true)}>
                        <MoreVertRoundedIcon />
                    </IconButton>
                }
                label={authProfile?.id == profile.id ? "Мой профиль" : profile.name}
            />
            <MobileContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 2
                    }}
                >
                    <Box>
                        <Wrapper />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",

                                gap: 3,
                                mt: "-24px",
                                px: 2
                            }}
                        >
                            <Avatar 
                                src={profile.avatar}
                                sx={{
                                    height: "72px",
                                    width: "72px"
                                }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1
                                }}
                            >
                                <Typography variant="h3">
                                    {profile.name}
                                </Typography>
                                <Typography variant="caption">
                                    @{profile.slug}
                                </Typography>
                            </Box>
                        </Box>
                        
                    </Box>
                    <Box

                    >
                        <WrappedText
                            lines={2}
                        >
                            {profile.about}
                        </WrappedText>
                        <ShowMore />
                    </Box>
                    {profile.links.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                columnGap: 1,
                                alignItems: "center"
                            }}
                        >
                            <LinkBlock link={profile.links[0]}/>
                            {profile.links.length > 1 && (
                                <Chip 
                                    clickable
                                    label={`и еще ${profile.links.length - 1}`}
                                />
                            )}
                        </Box>
                    )}
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
                </Box>
                <AppTabContext value={section}>
                    <Box
                        sx={{
                            mt: 4
                        }}
                    >
                        <AppTabList onChange={handleChangeSection}>
                            <AppTab value={"posts"} label="Посты"/>
                            <AppTab value={"collections"} label="Коллекции"/>
                        </AppTabList>
                        <AppTabPanel value={"posts"}>
                            <Container>
                                <Posts />
                            </Container>
                        </AppTabPanel>
                        <AppTabPanel value={"collections"}>
                            <Container>
                                <Collections />
                            </Container>
                        </AppTabPanel>
                    </Box>
                </AppTabContext>
            </MobileContainer>
            <Options 
                open={optionsOpen}
                onClose={() => setOptionsOpen(false)}
            />
        </>
    )
}