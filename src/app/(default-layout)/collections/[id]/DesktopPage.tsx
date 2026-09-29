import AppPageHeader from "@/components/AppPageHeader";
import { useAppSelector } from "@/lib/state/hooks";
import { Container,  } from "@mui/material";
import { selectCollection } from "@/features/collection/states/collection-page/slice";
import Author from "./components/Author";
import { ActionsDesktop } from "./components/Actions";
import MangaList from "./components/MangaList";

export default function DesktopPage() {
    const collection = useAppSelector(selectCollection)
    
    if (!collection)
        return 
    
    return (
        <>
            <Container maxWidth="lg" sx={{mt: 10}}>
                <AppPageHeader label={collection.name}/>
                <Author author={collection.creator}/>
                <ActionsDesktop 
                    sx={{
                        mt: 2
                    }}
                />
                <MangaList />
            </Container>
        </>
    )
}