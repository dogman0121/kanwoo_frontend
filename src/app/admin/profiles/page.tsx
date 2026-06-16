"use client"

import { EditPageHeader, EditPageNavbar, EditPageTitle } from "@/features/edit/components/EditHeader";
import { AccordionActions, AccordionDetails, AccordionSummary, Avatar, Box, Breadcrumbs, Button, CircularProgress, Divider, Grid, SxProps, Typography } from "@mui/material";
import CreateProfileDialog from "./_components/CreateProfileDIalog";
import { useContext, useEffect, useState } from "react";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { clientFetch } from "@/lib/fetch/clientFetch";
import InfiniteScroll from 'react-infinite-scroll-component';
import Profile from "@/types/profile/profile";
import { usePagePagination } from "@/features/pagination/hooks/usePagePagination";
import SearchInput from "../_components/SearchInput";
import { debounce } from "lodash";
import AdminProfileContext from "./_contexts/profileContext";
import { AdminAccordion, AdminAccordionActions, AdminAccordionDetails, AdminAccordionSummary } from "../_features/accordion/Accordion";
import AccordionOptionHeader from "../_components/AccordionOptionHeader";

function ProfileCardShortData() {
    const {profile} = useContext(AdminProfileContext)

    if (!profile) return

    return (
        <Grid
            container
            columns={10}
            sx={{
                width: "100%",
                alignItems: "center"
            }}
        >
            <Grid 
                size={4}
                spacing={2}
            >
                <Box
                    sx={{
                        display: "flex",
                        columnGap: 2,
                        alignItems: "center"
                    }}
                >
                    <Avatar 
                        src={profile.avatar} 
                        sx={{
                            width: "48px",
                            height: "48px"
                        }}
                    />
                    <Typography>{profile.name}</Typography>
                </Box>
            </Grid>
            <Grid size={3}>
                <Typography>открытый</Typography>
            </Grid>
            <Grid size={3}>
                <Typography>{new Date(profile.created_at).toLocaleDateString("ru-RU")}</Typography>
            </Grid>
        </Grid>
    )
}

function ProfileCardFullData({sx}: {sx?: SxProps}) {
    const { profile } = useContext(AdminProfileContext)

    if (!profile) return null;

    return (
        <Grid
            container
            columns={12}
            spacing={2}
            sx={{
                ...sx
            }}
        >
            <Grid size={3}>
                <AccordionOptionHeader>Тег</AccordionOptionHeader>
                <Typography>{profile.slug}</Typography>
            </Grid>
        </Grid>
    )
}

function ProfileCardActions() {

}

function ProfileCard({profile}: {profile: Profile}) {

    const [accordionExpanded, setAccordionExpanded] = useState(false)

    return (
        <AdminProfileContext.Provider
            value={{
                profile: profile
            }}
        >
            <AdminAccordion
                expanded={accordionExpanded}
                onChange={(_event, expanded) => setAccordionExpanded(expanded)}
            >
                <AdminAccordionSummary><ProfileCardShortData /></AdminAccordionSummary>
                <AdminAccordionDetails><ProfileCardFullData /></AdminAccordionDetails>
                <AdminAccordionActions><></></AdminAccordionActions>
            </AdminAccordion>
        </AdminProfileContext.Provider>
    )
}

export default function Page() {
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const {
        results: profiles,
        setResults: setProfiles,
        page,
        reset,
        setPage,
        perPage,
        totalCount,
        setTotalCount,
        hasMore,
    } = usePagePagination<Profile>({ perPage: 20 });

    const fetchProfiles = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const urlSearchParams = new URLSearchParams()
            if (query)
                urlSearchParams.append("query", query)

            urlSearchParams.append("page", page.toString())
            urlSearchParams.append("per_page", perPage.toString())
            
            const response = await clientFetch.get<Profile[]>("/admin/profiles?" + urlSearchParams.toString());

            const pagination = response.pagination;
            if (!pagination ||  !("page" in pagination)) 
                throw Error("Failed to get pagination from response!")

            setPage(pagination.page+1)
            setTotalCount(pagination.total_count)

            setProfiles(profiles => [...profiles, ...response.data])
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(debounce(() => {
        reset()
    }, 100), [query])

    return (
        <>
            <EditPageHeader>
                <Breadcrumbs>
                    <Typography>Профили</Typography>
                </Breadcrumbs>
                <EditPageTitle>Профили</EditPageTitle>
            </EditPageHeader>
            <EditPageNavbar>
                <Button
                    variant="contained"
                    onClick={() => setProfileDialogOpen(true)}
                >
                    Создать
                </Button>
            </EditPageNavbar>
            <CreateProfileDialog 
                open={profileDialogOpen}
                onClose={() => setProfileDialogOpen(false)}
            />
            <SearchInput 
                onChange={(event) => setQuery(event.target.value)}
            />
            <Divider />
            <EditPageContainer
                sx={{
                    py: 1
                }}
            >
                <Grid
                    container
                    columns={10}
                    spacing={2}
                    sx={{
                        pl: 3,
                        pr: "calc(15px + 24px)"
                    }}
                >
                    <Grid size={4}>
                        <Typography variant="caption">Название</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="caption">Приватность</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="caption">Дата создания</Typography>
                    </Grid>
                </Grid>
            </EditPageContainer>
            <Divider />
            <EditPageContainer
                sx={{
                    pb: 4
                }}
            >
                <Typography
                    sx={{
                        mt: 3
                    }}
                >
                    Найдено результатов: {totalCount}
                </Typography>
                <InfiniteScroll 
                    style={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                    dataLength={profiles.length}
                    next={fetchProfiles}
                    hasMore={hasMore}
                    loader={<CircularProgress />}
                >
                    {profiles.map(profile => (
                        <ProfileCard profile={profile} key={`admin_profiles_${profile.id}`}/>
                    ))}
                </InfiniteScroll>
            </EditPageContainer>
        </>
    )
}