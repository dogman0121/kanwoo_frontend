import { Container, Skeleton } from "@mui/material";
import DesktopHeroSliderSkeleton from "./_components/DesktopHeroSliderSkeleton";
import MangaCarouselSkeleton from "./_components/MangaCarouselSkeleton";

export default async function Loading() {

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