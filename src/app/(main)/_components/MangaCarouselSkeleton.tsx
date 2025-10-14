import { Box, Skeleton } from "@mui/material";


const MangaSkeleton = () => (
    <Skeleton 
        variant="rectangular"
        sx={{
            minWidth: "max(120px, calc((100% - 15px * 7) / 8))",
            height: "auto",
            aspectRatio: "2/3",
            borderRadius: "8px"
        }}
    />
)

export default function MangaCarouselSkeleton() {
    return (
        <Box>
            <Skeleton 
                variant="text"
                height={"20px"}
                width={"200px"}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "15px",
                    mt: "10px"
                }}
            >
                <MangaSkeleton />
                <MangaSkeleton />
                <MangaSkeleton />
                <MangaSkeleton />
                <MangaSkeleton />
                <MangaSkeleton />
                <MangaSkeleton />
                <MangaSkeleton />
            </Box>
        </Box>
    )
}