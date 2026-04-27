"use client"

import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditHeader from "@/features/edit/components/EditHeader"
import { Box, Button, Divider, SxProps, Typography } from "@mui/material"
import { useAppSelector, useAppStore } from "@/lib/state/hooks"
import { useRef } from "react"
import { clientFetch } from "@/lib/fetch/clientFetch"
import Collection from "@/types/collection/collection"
import { setStudioPageProfileCollections } from "@/lib/state/features/studioPage/studioPageProfileSlice"
import EditPageContainer from "@/features/edit/components/EditPageContainer"

const gridRowStyle: SxProps = {
    display: "grid",
    gridTemplateColumns: "6fr 1fr 1fr 1fr 1fr",
    columnGap: "15px",
    py: "15px"
}

export default function Page() {
    const profile = useAppSelector(state => state.studioPageProfile.profile);

    const store = useAppStore()

    const collections = useAppSelector(state => state.studioPageProfile.collections)
    const initialized = useRef(false);

    if (!initialized.current && profile) {
        initialized.current = true
        clientFetch.get<Collection[]>(`/profiles/${profile.slug}/collections`)
            .then((response) => {
                store.dispatch(setStudioPageProfileCollections(response.data))
            })
    }

    if (!profile)
        return null;
    
    return (
        <>
            <EditHeader>Мои списки</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                        >
                            Создать
                        </Button>
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
            <EditPageContainer>
                {collections && (
                    <>{collections.map(() => (<></>))}</>
                )}
            </EditPageContainer>
        </>
    )
}