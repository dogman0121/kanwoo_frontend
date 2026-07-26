import { Container } from "@mui/material";
import MangaCarouselSkeleton from "./_components/skeleton/MangaCarouselSkeleton";
import MobileHeroSliderSkeleton from "./_components/skeleton/MobileHeroSliderSkeleton";

export default function MobileSkeletonPage() {
    return (
        <>
            <MobileHeroSliderSkeleton />
            <Container 
                maxWidth="lg"
                sx={{
                    mt: "15px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "25px"
                }}
            >
                <MangaCarouselSkeleton />
                <MangaCarouselSkeleton />
                <MangaCarouselSkeleton />
                <MangaCarouselSkeleton />
            </Container>
        </>
    )
}