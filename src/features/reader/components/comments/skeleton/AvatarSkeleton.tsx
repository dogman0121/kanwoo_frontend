import { Skeleton } from "@mui/material";

export default function AvatarSkeleton() {
    return (
        <Skeleton 
            variant="circular"
            height={"40px"}
            animation={false}
            sx={{
                minWidth: "40px"
            }}
        />
    )
}