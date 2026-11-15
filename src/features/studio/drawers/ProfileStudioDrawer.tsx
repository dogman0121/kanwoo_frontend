"use client"

import { Avatar, Box, Divider, List, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/state/hooks";
import useSection from "@/features/studio/hooks/useSection";
import EditDrawer from "@/components/edit/EditDrawer";
import EditDrawerContainer from "@/components/edit/EditDrawerContainer";
import { routes, toHref } from "@/constants/routes/main.routes";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EditSectionsLinkButton from "@/components/edit/EditSectionsLinkButton";
import EditSectionsButton from "@/components/edit/EditSectionsButton";
import { selectProfile } from "@/features/studio/states/profile/page.slice";
import { Profile } from "@/features/profile/types/profile.type";
import { BottomOptionsContainer } from "./ui/BottomOptions";

export function StudioDrawerSkeleton() {
    const { section } = useSection()

    return (
        <EditDrawer>
            <EditDrawerContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Skeleton variant="circular" width={96} height={96}/>
                    <Box
                        sx={{
                            mt: 2,
                            
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >
                        <Typography><Skeleton width={100}/></Typography>
                        <Typography 
                            variant="caption" 
                            color="textSecondary"
                        >
                            <Skeleton width={50}/>
                        </Typography>
                    </Box>
                </Box>
                <List>
                    <EditSectionsButton 
                        selected={section == "main"}
                    >
                        <ListItemIcon>
                            <InfoOutlineRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Skeleton width={100}/>
                        </ListItemText>
                    </EditSectionsButton>
                    <EditSectionsButton 
                        selected={section == "manga"}
                    >
                        <ListItemIcon>
                            <LibraryBooksRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Skeleton width={100}/>
                        </ListItemText>
                    </EditSectionsButton>
                    <EditSectionsButton  
                        selected={section == "translations"}  
                    >
                        <ListItemIcon>
                            <TranslateRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Skeleton width={100}/>
                        </ListItemText>
                    </EditSectionsButton>
                    {/* <EditSectionsLinkButton  
                        link={toHref(routes.studio.profiles.collections, {slug: profile.slug})}
                        selected={section == "collections"}
                    >
                        <ListItemIcon>
                            <CollectionsBookmarkRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Списки
                        </ListItemText>
                    </EditSectionsLinkButton> */}
                </List>
            </EditDrawerContainer>
            <BottomOptionsContainer>
                <List>
                    <EditSectionsButton>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Skeleton width={100}/>
                        </ListItemText>
                    </EditSectionsButton>
                </List>
            </BottomOptionsContainer>
        </EditDrawer>
    )
}

export function StudioDrawer({profile}: {profile: Profile}) {
    const { section } = useSection()

    return (
        <EditDrawer>
            <EditDrawerContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar 
                        src={profile.avatar}
                        sx= {{
                            width: "96px",
                            height: "96px"
                        }}
                    />
                    <Box
                        sx={{
                            mt: 2,
                            textAlign: "center"
                        }}
                    >
                        <Typography>{profile.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            @{profile.slug}
                        </Typography>
                    </Box>
                </Box>
                <List>
                    <EditSectionsLinkButton 
                        link={toHref(routes.studio.profiles.item, {slug: profile.slug})}
                        selected={section == "main"}
                    >
                        <ListItemIcon>
                            <InfoOutlineRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Информация
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton 
                        link={toHref(routes.studio.profiles.manga, {slug: profile.slug})}
                        selected={section == "manga"}
                    >
                        <ListItemIcon>
                            <LibraryBooksRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Тайтлы
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton  
                        link={toHref(routes.studio.profiles.translations, {slug: profile.slug})}
                        selected={section == "translations"}  
                    >
                        <ListItemIcon>
                            <TranslateRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Переводы
                        </ListItemText>
                    </EditSectionsLinkButton>
                    {/* <EditSectionsLinkButton  
                        link={toHref(routes.studio.profiles.collections, {slug: profile.slug})}
                        selected={section == "collections"}
                    >
                        <ListItemIcon>
                            <CollectionsBookmarkRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Списки
                        </ListItemText>
                    </EditSectionsLinkButton> */}
                </List>
            </EditDrawerContainer>
            <BottomOptionsContainer>
                <List>
                    <EditSectionsButton>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Настройки
                        </ListItemText>
                    </EditSectionsButton>
                </List>
            </BottomOptionsContainer>
        </EditDrawer>
    )
}

export default function ProfileStudioDrawer() {
    const profile = useAppSelector(selectProfile)

    if (!profile)
        return <StudioDrawerSkeleton />

    return (<StudioDrawer profile={profile}/>)
}