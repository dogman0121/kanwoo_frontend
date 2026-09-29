import { Skeleton } from "@mui/material";

export default function DesktopHeroSliderSkeleton() {
    return (
        <Skeleton 
            variant="rectangular"
            width={"100%"}
            height={"auto"}
            sx={{
                aspectRatio: "3/1"
            }}
        />
    )
}