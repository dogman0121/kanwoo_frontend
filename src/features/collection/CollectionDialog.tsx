"use client"

import { clientFetch } from "@/lib/fetch/clientFetch";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogProps, DialogTitle, List, ListItemButton, Typography } from "@mui/material";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import CreateCollectionDialog from "@/components/CreateCollectionDialog";
import Manga from "@/types/manga/manga";
import Collection from "@/types/collection/collection";
import { addAuthProfileCollection, addMangaIntoAuthProfileCollection, removeMangaFromAuthProfileCollection, setAuthProfileCollections } from "@/lib/state/features/authProfile/authProfileSlice";
import PostersStack from "@/components/PostersStack";

export default function CollectionDialog({open, onClose, manga, ...props}: {manga: Manga} & DialogProps){
    const dispatch = useAppDispatch()

    const collections = useAppSelector(state => state.authProfile.collections)

    const [createCollectionDialogOpen, setCreateCollectonDialogOpen] = useState<boolean>(false)

    const removeManga = async (collection: Collection) => {
        await clientFetch.post(`/collections/${collection.id}/remove-manga`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                manga: manga?.slug
            })
        })

        dispatch(removeMangaFromAuthProfileCollection({id: collection.id, manga: manga}))
    }

    const addManga = async (collection: Collection) => {
        await clientFetch.post(`/collections/${collection.id}/add-manga`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                manga: manga?.slug
            })
        })

        dispatch(addMangaIntoAuthProfileCollection({id: collection.id, manga: manga}))
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                {...props}
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
                                    try {
                                        if (collection.manga.find(val => val.id == manga.id))
                                            removeManga(collection)
                                        else {
                                            addManga(collection)
                                        }   
                                    } finally {
                                        onClose?.({}, "escapeKeyDown")
                                    }
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
                                                {collection.manga.length} тайтлов
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption">{collection.privacy.name}</Typography>
                                    </Box>
                                    <Checkbox 
                                        checked={collection.manga.findIndex(val => val.id == manga.id) != -1}
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
                        onClick={() => setCreateCollectonDialogOpen(true)}
                        sx={{
                            mt: 3
                        }}
                    >
                        Создать коллекцию
                    </Button>
                </DialogContent>
            </Dialog>
            <CreateCollectionDialog 
                open={createCollectionDialogOpen}
                onClose={() => setCreateCollectonDialogOpen(false)}
                onCreate={(collection) => {
                    dispatch(addAuthProfileCollection(collection))
                }}
            />
        </>
    )
}