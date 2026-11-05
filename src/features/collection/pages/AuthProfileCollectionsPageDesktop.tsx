import AppPageHeader from "@/components/app/AppPageHeader";
import { Container } from "@mui/material";
import CollectionsList from "../components/ui/CollectionsList";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectCollections } from "../states/auth-profile-collections-page/slice";
import { useEffect } from "react";
import { fetchCollections } from "../states/lib/thunks";

export default function AuthProfileCollectionsPageDesktop() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCollections())
    }, [])

    const collections = useAppSelector(selectCollections)

    return (
        <>
            <Container maxWidth="lg" sx={{
                mt: 10,
                pb: 4
            }}>
                <AppPageHeader 
                    label="Мои коллекции"
                    disableMobile
                />
                <CollectionsList collections={collections} sx={{mt: 4}}/>
            </Container>        
        </>
    )
}