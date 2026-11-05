"use client"

import { Entity } from "@/lib/types/Entity.type"
import { Collection } from "../types/collection.type"
import { CollectionContext } from "../types"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { initializeCollectionPage, selectAddMangaDialogOpen, selectCollection, selectCollectionManga, selectEditDialogOpen, setAddMangaDialogOpen, setEditDialogOpen } from "../states/collection-page/slice"
import { useEffect, useRef, useState, useTransition } from "react"
import { Container, SxProps } from "@mui/system"
import AppPageHeader from "@/components/app/AppPageHeader"
import Author from "../components/Author"
import { useRouter } from "next/navigation"
import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import { openShareBackdrop } from "@/features/global/states/app/slice"
import { routes, toHref } from "@/constants/routes/main.routes"
import ActionsContainer from "../components/ui/ActionsContainer"
import { Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Confirmation from "@/components/Confirmation"
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { deleteCollection, fetchCollectionManga, saveCollection, unsaveCollection } from "../states/lib/thunks"
import MangaList from "../components/ui/MangaList"
import { fetchManga } from "@/features/manga/states/manga/slice"
import LoadingBox from "@/components/loading/LoadingBox"
import AddMangaDialog from "../components/AddMangaDialog"
import ButtonWithAuthorization from "@/components/ButtonWithAuthorization"
import PrivacyLabel from "../components/ui/PrivacyLabel"
import EditDialog from "../components/EditDialog"
import AppButton from "@/components/app/AppButton"

function ActionsDesktop({sx}: {sx?: SxProps}) {
    const dispatch = useAppDispatch()

    const router = useRouter()

    const collection = useAppSelector(selectCollection)
    const authProfile = useAppSelector(selectAuthProfile)
    const addMangaDialogOpen = useAppSelector(selectAddMangaDialogOpen)

    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
    const optionsButtonRef = useRef(null)

    const handleShare = () => {
        if (!collection) return
        
        dispatch(openShareBackdrop(toHref(routes.collections.item, {id: collection.data.id.toString()})))
    }

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
            <ActionsContainer sx={{mt: 2}}>
                {authProfile?.id == collection.data.creator.id ?
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                dispatch(setAddMangaDialogOpen(true))
                            }}
                        >
                            Добавить мангу
                        </Button>
                        <IconButton onClick={handleShare}>
                            <ShareRoundedIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(setEditDialogOpen(true))}
                        >
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton
                            ref={optionsButtonRef}
                            onClick={() => setOptionsMenuOpen(true)}
                        >
                            <MoreVertRoundedIcon />
                        </IconButton>
                        
                    </>
                    :
                    <>
                        {collection.context?.viewer?.is_saved ?
                            <AppButton
                                loadingEnabled
                                variant="contained"
                                color="inherit"
                                onClick={handleUnsave}
                            >
                                Убрать
                            </AppButton>
                            :
                            <AppButton
                                loadingEnabled
                                authRequired
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                            >
                                Сохранить
                            </AppButton>
                        }
                        <IconButton onClick={handleShare}>
                            <ShareRoundedIcon />
                        </IconButton>
                    </>
                }
            </ActionsContainer>
            <Menu
                open={optionsMenuOpen}
                onClose={() => setOptionsMenuOpen(false)}
                anchorEl={optionsButtonRef.current}
            >
                <Confirmation onConfirm={() => {
                    dispatch(deleteCollection(collection.data.id)).unwrap()

                    setOptionsMenuOpen(false)
                    router.back()
                }}>
                    <MenuItem>
                        <ListItemIcon>
                            <DeleteRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Удалить
                        </ListItemText>
                    </MenuItem>
                </Confirmation>
            </Menu>
            <AddMangaDialog 
                open={addMangaDialogOpen}
                onClose={() => dispatch(setAddMangaDialogOpen(false))}
                context={{
                    collectionID: collection.data.id
                }}
            />
        </>
    )
}


export default function CollectionPageDesktop({
    collection
}: {
    collection: Entity<Collection, CollectionContext>
}) {
    const dispatch = useAppDispatch()

    const editDialogOpen = useAppSelector(selectEditDialogOpen)
    const manga = useAppSelector(selectCollectionManga)
    const [mangaLoading, setMangaLoading] = useTransition()
    const collectionFromState = useAppSelector(selectCollection)

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
            <Container maxWidth="lg" sx={{mt: 10, pb: 4}}>
                <Typography variant="h1">
                    {collectionFromState.data.name}
                    <PrivacyLabel privacy={collectionFromState.data.privacy.id} sx={{ml: 2}}/>
                </Typography>
                <Author author={collectionFromState.data.creator}/>
                <ActionsDesktop />
                <LoadingBox loading={mangaLoading}>
                    <MangaList manga={manga}/>
                </LoadingBox>
            </Container>
            <EditDialog 
                collection={collectionFromState.data}
                open={editDialogOpen}
                onClose={() => dispatch(setEditDialogOpen(false))}
            />
        </>
    )
}