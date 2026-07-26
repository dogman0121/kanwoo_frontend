"use client"

import { clientFetch } from "@/lib/fetch/clientFetch";
import { useAppSelector } from "@/lib/state/hooks";
import ProfileCollection from "@/types/profile/profileCollection";
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogContent, DialogProps, DialogTitle, List, ListItemButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import CreateCollectionDialog from "@/components/CreateCollectionDialog";

export default function CollectionDialog({open, onClose, ...props}: DialogProps){
    const [collections, setCollections] = useState<ProfileCollection[]>([])
    const [createCollectionDialogOpen, setCreateCollectonDialogOpen] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState(true)

    const authProfile = useAppSelector(state => state.authProfile.profile)
    const manga = useAppSelector(state => state.mangaPage.manga)

    useEffect(() => {
        if (!authProfile || !manga) return;

        setIsFetching(true)

        if (open)
            clientFetch.get<ProfileCollection[]>(`/profiles/${authProfile.slug}/collections?scope=creator&from_manga=${manga.slug}`)
                .then(resp => {
                    setCollections(resp.data)
                })
                .finally(() => {
                    setIsFetching(false)
                })
    }, [open, authProfile, manga])

    if (isFetching) return;
    
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
                        {collections.map(c => (
                            <ListItemButton
                                key={`manga_page_collection_${c.id}`}
                                onClick={async () => {
                                    try {
                                        if (c.contain_manga){
                                            clientFetch.post(`/collections/${c.id}/remove-manga`, {
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    manga: manga?.slug
                                                })
                                            })
                                        }

                                        else {
                                            clientFetch.post(`/collections/${c.id}/add-manga`, {
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    manga: manga?.slug
                                                })
                                            })
                                        }   
                                    } finally {
                                        onClose?.({}, "escapeKeyDown")
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        aspectRatio: "3/4",
                                        width: "40px",
                                        bgcolor: "secondary.main",
                                        borderRadius: "6px"
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        ml: 3
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
                                            <Typography>{c.name}</Typography>
                                            <Typography 
                                                sx={{
                                                    ml: 2
                                                }}
                                                variant="caption"
                                            >
                                                {c.manga_count} тайтлов
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption">{c.privacy.name}</Typography>
                                    </Box>
                                    <Checkbox 
                                        checked={c.contain_manga}
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
                onCreate={(collection) => {}}
            />
        </>
    )
}