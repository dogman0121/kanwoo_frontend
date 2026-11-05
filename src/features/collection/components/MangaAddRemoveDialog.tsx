"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, List, ListItemButton, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import PostersStack from "@/components/poster/PostersStack";
import { selectAuthProfileCollections } from "@/features/auth/states/auth-profile";
import { Collection, CollectionPreview } from "@/types/collection/collection";
import { setCreateCollectionDialogOpen } from "@/features/global/states/app/slice";
import { MangaBlock, MangaEntity } from "@/features/manga/states/manga/state";
import { loadCollections, selectCollectionsLoaded } from "@/features/auth/states/auth-profile/collections.slice";
import { useEffect, useTransition } from "react";
import { addMangaIntoCollection, removeMangaFromCollection } from "../states/lib/thunks";
import { MangaShort } from "@/features/manga/types";
import { selectMangaById } from "@/features/manga/states/manga/selectors";

interface CollectionDialogProps {
    open: boolean,
    context: {
        mangaId: number
    },
    onClose?: () => void,
}

export default function MangaAddRemoveDialog({
    open, 
    onClose, 
    context, 
}: CollectionDialogProps){
    const dispatch = useAppDispatch()

    const [collectionsIsLoading, setCollectionsIsLoading] = useTransition()

    const manga = useAppSelector(state => selectMangaById(state, context.mangaId))
    const collectionsLoaded = useAppSelector(selectCollectionsLoaded)
    const collections = useAppSelector(selectAuthProfileCollections)

    const isMangaInCollection = (manga: MangaEntity | null, collectionId: number) => {
        if (!manga) return
        
        return manga.context!.viewer.collections.findIndex(cId => cId == collectionId) != -1
    }

    const removeManga = async (collection: Collection) => {
        console.log("remove")
        if (!manga) return

        dispatch(removeMangaFromCollection({mangaId: manga?.data.id, collectionId: collection.id}))
    }

    const addManga = async (collection: Collection) => {
        console.log("add")
        if (!manga) return
        dispatch(addMangaIntoCollection({mangaId: manga.data.id, collectionId: collection.id}))
    }

    useEffect(() => {
        if (open && !collectionsLoaded && !collectionsIsLoading) {
            setCollectionsIsLoading(async () => {
                await dispatch(loadCollections())
            })
        }
    }, [open, collectionsLoaded, collectionsIsLoading])
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => {
                    onClose?.()
                }}
            >
                <DialogTitle>Выберите коллекцию</DialogTitle>
                <DialogContent>
                    {collectionsIsLoading ?
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <CircularProgress />
                        </Box>
                        :
                        <List>
                            {collections?.map(collection => (
                                <ListItemButton
                                    key={`manga_page_collection_${collection.data.id}`}
                                    sx={{
                                        borderRadius: 1
                                    }}
                                    onClick={async () => {
                                        if (!manga) return

                                        isMangaInCollection(manga, collection.data.id) ? 
                                        removeManga(collection.data) : 
                                        addManga(collection.data)
                                    }}
                                >
                                    <Box
                                        sx={{
                                            ml: 2
                                        }}
                                    >
                                        <PostersStack 
                                            width="32px"
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            ml: 4
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row"
                                                }}
                                            >
                                                <Typography>{collection.data.name}</Typography>
                                                <Typography 
                                                    sx={{
                                                        ml: 2
                                                    }}
                                                    variant="caption"
                                                >
                                                    {collection.data.manga_count} тайтлов
                                                </Typography>
                                            </Box>
                                            <Typography variant="caption">{collection.data.privacy.name}</Typography>
                                        </Box>
                                        <Checkbox 
                                            checked={
                                                isMangaInCollection(manga, collection.data.id)
                                            }
                                        />
                                    </Box>
                                </ListItemButton>
                            ))}
                        </List>
                    }
                    <Button 
                        variant="contained"
                        fullWidth
                        startIcon={
                            <AddRoundedIcon />
                        }
                        onClick={() => dispatch(setCreateCollectionDialogOpen(true))}
                        sx={{
                            mt: 3
                        }}
                    >
                        Создать коллекцию
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}