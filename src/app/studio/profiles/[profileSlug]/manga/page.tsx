"use client"

import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditHeader from "@/features/edit/components/EditHeader"
import { Box, Button, Divider, SxProps, Typography } from "@mui/material"
import Link from "next/link"
import { useAppSelector, useAppStore } from "@/lib/state/hooks"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { useRef } from "react"
import { studioClientApi } from "@/lib/fetch/features/studio/client"
import { SuccessResponse } from "@/lib/fetch/apiResponse"
import Poster from "@/components/Poster"
import { setStudioPageProfileManga } from "@/lib/state/features/studioPage/studioPageProfileSlice"
import Manga from "@/types/manga/manga"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { ROUTES } from "@/routes"

const gridRowStyle: SxProps = {
    display: "grid",
    gridTemplateColumns: "6fr 1fr 1fr 1fr 1fr",
    columnGap: "15px",
    py: "15px"
}

function TitleGridRow({title}: {title: Manga}){ 
    const profile = useAppSelector(state => state.studioPageProfile.profile);

    if (!profile)
        return null;

    return (
        <Box
            sx={{
                width: "100%",
                "&:not(:first-child)": {
                    borderTop: "1px solid",
                    borderColor: "divider"
                }
            }}
        >
            <EditPageContainer
                sx={{
                    ...gridRowStyle,
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "12px",
                        alignItems: "center"
                    }}
                >
                    <Poster 
                        width="80px"
                        src={title.poster?.medium}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "5px"
                        }}
                    >
                        <Typography variant="caption">{title.type?.name} / {title.year}</Typography>
                        <Link href={`/studio/manga/${title.slug}`}>
                            <Typography
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                            >{title.name}</Typography>
                        </Link>
                        <Typography 
                            variant="caption"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WEbkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {title.description}
                        </Typography>
                    </Box>
                </Box>
                <Typography>{title.status?.name}</Typography>
                <Typography>{title.adult?.name}</Typography>
                <Typography>{new Date(title.created_at).toLocaleDateString()}</Typography>
                <Typography>{title.views}</Typography>
            </EditPageContainer>
        </Box>
    )
}


export default function Page() {
    const store = useAppStore()
    const initialized = useRef(false)

    const profile = useAppSelector(state => state.studioPageProfile.profile);

    if (!initialized.current && profile) {
        initialized.current = true
        clientFetch.get<Manga[]>(`/studio/profiles/${profile.slug}/manga`)
            .then((response: SuccessResponse<Manga[]>) => {
                store.dispatch(setStudioPageProfileManga(response.data))
            })
    }

    const titles = useAppSelector(state => state.studioPageProfile.manga)
    
    if (!profile) return 
    
    return (
        <>
            <EditHeader>Мои тайтлы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Link
                            href={ROUTES.STUDIO.PROFILE.MANGA.CREATE(profile.slug)}
                        >
                            <Button
                                variant="contained"
                            >
                                Создать
                            </Button>
                        </Link>
                    </>
                }
            />
            <EditPageContainer>
                <Box
                    sx={{
                        ...gridRowStyle,
                    }}
                >
                    <Typography variant="caption">Тайтл</Typography>
                    <Typography variant="caption">Статус</Typography>
                    <Typography variant="caption">Ограничения</Typography>
                    <Typography variant="caption">Дата</Typography>
                    <Typography variant="caption">Просмотры</Typography>
                </Box>
            </EditPageContainer>
            <Divider />
            <Box
                sx={{

                }}
            >
                {titles?.map((title) => (
                    <TitleGridRow key={title.id} title={title}/>
                ))}
            </Box>
        </>
    )
}