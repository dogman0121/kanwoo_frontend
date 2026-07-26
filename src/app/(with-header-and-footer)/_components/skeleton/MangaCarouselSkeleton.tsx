import { Box, Skeleton } from "@mui/material";
import { random, range } from "lodash";


const MangaSkeleton = () => (
    <Skeleton 
        variant="rectangular"
        sx={{
            minWidth: "max(120px, calc((100% - 15px * 6) / 7))",
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
                {range(0, 7).map((idx) => <MangaSkeleton key={`manga_carousel_item_${idx}_${Math.random()}`}/>)}
            </Box>
        </Box>
    )
}