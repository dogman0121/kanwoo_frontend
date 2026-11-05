"use client"

import { Entity } from "@/lib/types/Entity.type"
import { Collection } from "../types/collection.type"
import { CollectionContext } from "../types"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import { useEffect, useState, useTransition } from "react"
import AppPageHeader, { BackButton } from "@/components/app/AppPageHeader"
import { Button, IconButton, SxProps, Typography } from "@mui/material"
import { initializeCollectionPage, selectAddMangaDialogOpen, selectCollection, selectCollectionManga, setAddMangaDialogOpen } from "../states/collection-page/slice"
import MobileContainer from "@/components/MobileContainer"
import Author from "../components/Author"
import MangaList from "../components/ui/MangaList"
import ActionsContainer from "../components/ui/ActionsContainer"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MobileOptionsOptions from "../components/CollectionMobileOptions"
import { fetchCollectionManga, saveCollection, unsaveCollection } from "../states/lib/thunks"
import LoadingBox from "@/components/loading/LoadingBox"
import AddMangaDialog from "../components/AddMangaDialog"
import ButtonWithAuthorization from "@/components/ButtonWithAuthorization"
import PrivacyLabel from "../components/ui/PrivacyLabel"

export function Actions({sx}: {sx?: SxProps}) {
    const dispatch = useAppDispatch()

    const collection = useAppSelector(selectCollection)
    
    const authProfile = useAppSelector(selectAuthProfile)

    const handleSave = async () => {
        if (!collection) return

        await dispatch(saveCollection(collection.data.id)).unwrap()
    }

    const handleUnsave = async () => {
        if (!collection) return

        await dispatch(unsaveCollection(collection.data.id)).unwrap()
    }

    if (!collection)
        return

    return (
        <>
            {authProfile?.id != collection.data.creator.id && (
                <ActionsContainer sx={{mt: 2, ...sx}}>
                    {collection.context?.viewer?.is_saved ?
                        <ButtonWithAuthorization
                            variant="contained"
                            color="secondary"
                            onClick={handleUnsave}
                        >
                            Убрать
                        </ButtonWithAuthorization>
                        :
                        <ButtonWithAuthorization
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                        >
                            Сохранить
                        </ButtonWithAuthorization>
                    }
                </ActionsContainer>
            )}
        </>
    )
}

export default function CollectionPageMobile({
    collection
}: {
    collection: Entity<Collection, CollectionContext>
}) {
    const dispatch = useAppDispatch()
    
    const authProfile = useAppSelector(selectAuthProfile)
    const addMangaDialogOpen = useAppSelector(selectAddMangaDialogOpen)
    const manga = useAppSelector(selectCollectionManga)
    const collectionFromState = useAppSelector(selectCollection)

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [mangaLoading, setMangaLoading] = useTransition()
    
    useEffect(() => {
        dispatch(initializeCollectionPage(collection))
        setMangaLoading(async () => {
            await dispatch(fetchCollectionManga(collection.data.id))
        }) 
    }, [collection])

    if (!collectionFromState)
        return
    
    return (
        <>
            <AppPageHeader 
                startAdornment={<BackButton />}
                endAdornment={
                    <>
                        {authProfile?.id == collectionFromState.data.creator.id && (
                            <IconButton onClick={() => dispatch(setAddMangaDialogOpen(true))}>
                                <AddRoundedIcon />
                            </IconButton>
                        )}
                        <IconButton onClick={() => setOptionsOpen(true)}>
                            <MoreVertRoundedIcon />
                        </IconButton>
                    </>
                }
                label="" 
            />
            <MobileContainer>
                <Typography variant="h1">
                    {collectionFromState.data.name}
                    <PrivacyLabel privacy={collectionFromState.data.privacy.id} sx={{ml: 2}}/>
                </Typography>
                <Author author={collectionFromState.data.creator} />
                <Actions/>
                <LoadingBox loading={mangaLoading}>
                    <MangaList manga={manga}/>
                </LoadingBox>
            </MobileContainer>
            <MobileOptionsOptions 
                open={optionsOpen}
                onClose={() => setOptionsOpen(false)}
            />
            <AddMangaDialog 
                open={addMangaDialogOpen}
                onClose={() => dispatch(setAddMangaDialogOpen(false))}
                context={{
                    collectionID: collectionFromState.data.id
                }}
            />
        </>
    )
}