import { Box, Skeleton } from "@mui/material";
import { random, range } from "lodash";


export const MangaSkeleton = () => (
    <Skeleton 
        variant="rectangular"
        sx={{
            width: "100%",
            height: "auto",
            aspectRatio: "2/3",
            borderRadius: "8px"
        }}
    />
)

export default function MangaListSkeleton() {
    return (
        <>
            {range(0, 7).map((idx) => <MangaSkeleton key={`manga_carousel_item_${idx}_${Math.random()}`}/>)}
        </>
    )
}