"use client"

import { Box, Button, Skeleton } from "@mui/material";
import { range } from "lodash";

export default function MobileHeroSliderSkeleton() {
    return (
        <Box>
            <Skeleton 
                variant="rectangular"
                width={"100%"}
                height={"auto"}
                sx={{
                    aspectRatio: "5/4"
                }}
            />
            <Button
                disabled 
                variant="contained"
                sx={{
                    px: 2,
                    height: "35px",
                    width: "100%",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",

                    justifyContent: "center",
                    pt: 3,
                    pb: 1
                }}
            >
                {range(0, 3).map(idx => (
                    <Skeleton 
                        key={`home_page_hero_slider_buller_skeleton_${idx}`}
                        variant="rounded"
                        sx={{
                            width: "25px",
                            height: "8px"
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}