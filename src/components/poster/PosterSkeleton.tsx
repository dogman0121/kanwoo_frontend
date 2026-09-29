import { Skeleton, SxProps } from "@mui/material";

export default function PosterSkeleton({width, sx}: {width?: string, sx?: SxProps}){
    return (
        <Skeleton
            width={width || "100%"}
            height={width ?`calc(${width} / 2 * 3)` : "100%"}
            variant="rectangular"
            component={"div"}
            sx={{
                width: "100%",
                borderRadius: "6% / 4%",
                aspectRatio: "2/3",
                ...sx
            }}
        />
    )
}