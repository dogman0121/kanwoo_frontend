import AppPageHeader, { BackButton } from "@/components/AppPageHeader";
import { Grid, IconButton } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MobileContainer from "@/components/MobileContainer";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectCollections } from "@/features/collection/states/auth-profile-collections-page/slice";
import CollectionsList from "./_components/CollectionsList";
import { setCreateCollectionDialogOpen } from "@/features/global/states/app/slice";

export default function MobilePage() {
    const dispatch = useAppDispatch()

    const handleOpenCollectionDialog = () => {
        dispatch(setCreateCollectionDialogOpen(true))
    }

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
                <CollectionsList />
            </MobileContainer>
        </>
    )
}