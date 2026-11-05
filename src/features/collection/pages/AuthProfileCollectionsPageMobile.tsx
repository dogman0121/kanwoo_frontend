"use client"

import AppPageHeader, { BackButton } from "@/components/app/AppPageHeader"
import MobileContainer from "@/components/MobileContainer"
import { setCreateCollectionDialogOpen } from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { IconButton } from "@mui/material"
import CollectionsList from "../components/ui/CollectionsList"
import { selectCollections } from "../states/auth-profile-collections-page/slice"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect } from "react"
import { fetchCollections } from "../states/lib/thunks"

export default function AuthProfileCollectionsPageMobile() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCollections())
    }, [])
    
    const handleOpenCollectionDialog = () => {
        dispatch(setCreateCollectionDialogOpen(true))
    }

    const collections = useAppSelector(selectCollections)

    return (
        <>
            <AppPageHeader
                label="Мои коллекции"
                startAdornment={
                    <BackButton />
                }
                endAdornment={
                    <IconButton onClick={handleOpenCollectionDialog}>
                        <AddRoundedIcon />
                    </IconButton>
                }
            />
            <MobileContainer>
                <CollectionsList collections={collections}/>
            </MobileContainer>
        </>
    )
}