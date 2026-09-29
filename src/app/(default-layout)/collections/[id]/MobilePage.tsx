import AppPageHeader, { BackButton } from "@/components/AppPageHeader";
import MobileContainer from "@/components/MobileContainer";
import { Collection } from "@/types/collection";
import { Box, IconButton, Typography } from "@mui/material";
import Author from "./components/Author";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Actions, { ActionsMobile } from "./components/Actions";
import MangaGrid from "@/components/manga/MangaGrid";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectCollection, selectCollectionManga, setAddMangaDialogOpen } from "@/features/collection/states/collection-page/slice";
import MangaItem from "@/components/manga/MangaItem";
import { selectAuthProfile } from "@/features/global/states/auth-profile";
import { useState } from "react";
import Options from "./components/mobile/Options";
import MangaList from "./components/MangaList";

export default function MobilePage() {
    const dispatch = useAppDispatch()

    const collection = useAppSelector(selectCollection)
    const manga = useAppSelector(selectCollectionManga)
    const authProfile = useAppSelector(selectAuthProfile)

    const [optionsOpen, setOptionsOpen] = useState(false)

    if (!collection)
        return
    
    return (
        <>
            <AppPageHeader 
                startAdornment={<BackButton />}
                endAdornment={
                    <>
                        {authProfile?.id == collection.creator.id && (
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
                    {collection.name}
                </Typography>
                <Author author={collection.creator} />
                <ActionsMobile sx={{mt: 2}}/>
                <MangaList />
            </MobileContainer>
            <Options 
                open={optionsOpen}
                onClose={() => setOptionsOpen(false)}
            />
        </>
    )
}