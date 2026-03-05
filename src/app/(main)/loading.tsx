import { Container, Skeleton } from "@mui/material";
import MangaCarouselSkeleton from "./(with_footer)/_components/MangaCarouselSkeleton";
import DesktopHeroSliderSkeleton from "./(with_footer)/_components/DesktopHeroSliderSkeleton";

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