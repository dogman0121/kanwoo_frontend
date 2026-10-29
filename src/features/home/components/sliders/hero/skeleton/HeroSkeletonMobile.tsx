"use client"

import { Skeleton } from "@mui/material";

export default function MobileHeroSliderSkeleton() {
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