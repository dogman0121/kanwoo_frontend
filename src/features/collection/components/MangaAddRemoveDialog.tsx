"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, List, ListItemButton, Typography } from "@mui/material";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import CreateCollectionDialog from "@/features/collection/components/CreateDialog";
import PostersStack from "@/components/poster/PostersStack";
import { selectAuthProfileCollections } from "@/features/global/states/auth-profile";
import { Collection, CollectionPreview } from "@/types/collection/collection";
import { setCreateCollectionDialogOpen } from "@/features/global/states/app/slice";
import { selectMangaBlockBySlug } from "@/features/global/states/manga/selectors";
import { MangaBlock } from "@/features/global/states/manga/state";

interface CollectionDialogProps {
    open: boolean,
    context: {
        mangaUUID: string
    },
    onClose?: () => void,
}

export default function MangaAddRemoveDialog({
    open, 
    onClose, 
    context, 
}: CollectionDialogProps){
    const dispatch = useAppDispatch()

    const manga = useAppSelector(state => selectMangaBlockBySlug(state, context.mangaUUID))
    const collections = useAppSelector(selectAuthProfileCollections)

    const isMangaInCollection = (mangaBlock: MangaBlock, collectionId: number) => {
        return mangaBlock.mangaContext.viewer.collections.findIndex(cId => cId == collectionId) != -1
    }

    const removeManga = async (collection: Collection) => {
    }

    const addManga = async (collection: Collection) => {
        
    }
    
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
                    <List>
                        {collections?.map(collection => (
                            <ListItemButton
                                key={`manga_page_collection_${collection.id}`}
                                sx={{
                                    borderRadius: 1
                                }}
                                onClick={async () => {
                                    isMangaInCollection(manga, collection.id) ? removeManga(collection) : addManga(collection)
                                }}
                            >
                                <PostersStack 
                                    width="32px"
                                />
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
                                            <Typography>{collection.name}</Typography>
                                            <Typography 
                                                sx={{
                                                    ml: 2
                                                }}
                                                variant="caption"
                                            >
                                                {collection.manga_count} тайтлов
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption">{collection.privacy.name}</Typography>
                                    </Box>
                                    <Checkbox 
                                        checked={
                                            isMangaInCollection(manga, collection.id)
                                        }
                                    />
                                </Box>
                            </ListItemButton>
                        ))}
                    </List>
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