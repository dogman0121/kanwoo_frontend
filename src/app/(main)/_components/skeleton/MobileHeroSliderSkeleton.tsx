import { Skeleton } from "@mui/material";

export default async function MobileHeroSliderSkeleton() {
    return (
        <Skeleton 
            variant="rectangular"
            width={"100%"}
            height={"auto"}
            sx={{
                aspectRatio: "5/4"
            }}
        />
    )
}