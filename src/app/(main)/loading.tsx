import { Container, Skeleton } from "@mui/material";
import MangaCarouselSkeleton from "./_components/MangaCarouselSkeleton";

export default async function Loading() {

    return (
        <Container 
            maxWidth="lg"
            sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "column",
                rowGap: "25px"
            }}
        >
            <Skeleton 
                variant="rectangular"
                width={"100%"}
                height={"auto"}
                sx={{
                    borderRadius: "16px",
                    aspectRatio: "2/1"
                }}
            />
            <MangaCarouselSkeleton />
            <MangaCarouselSkeleton />
            <MangaCarouselSkeleton />
            <MangaCarouselSkeleton />
        </Container>
    )
}