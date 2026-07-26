import { Container } from "@mui/material";
import DesktopHeroSliderSkeleton from "./_components/skeleton/DesktopHeroSliderSkeleton";
import MangaCarouselSkeleton from "./_components/skeleton/MangaCarouselSkeleton";

export default function DesktopSkeletonPage() {
    return (
        <>
            <DesktopHeroSliderSkeleton />
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