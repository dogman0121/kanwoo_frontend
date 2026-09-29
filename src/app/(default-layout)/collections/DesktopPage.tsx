import AppPageHeader from "@/components/AppPageHeader";
import { Container } from "@mui/material";
import CollectionsList from "./_components/CollectionsList";
import Footer from "../_layouts/Footer";

export default function DesktopPage() {

    

    return (
        <>
            <Container maxWidth="lg" sx={{
                mt: 10
            }}>
                <AppPageHeader 
                    label="Мои коллекции"
                    disableMobile
                />
                <CollectionsList mt={4}/>
            </Container>

            <Footer />            
        </>
    )
}