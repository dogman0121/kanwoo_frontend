import { Box, Skeleton, Typography } from "@mui/material";
import { DescriptionText } from "../Description";



export default function DescriptionSkeleton() {
    return (
        <Box>
            <DescriptionText><Skeleton /></DescriptionText>
            <DescriptionText><Skeleton /></DescriptionText>
            <DescriptionText><Skeleton /></DescriptionText>
            <DescriptionText><Skeleton /></DescriptionText>

            <Skeleton 
                variant="rectangular"
                width={120}
                height={35}
                sx={{
                    mt: 2,
                    borderRadius: "32px"
                }}
            />
        </Box>
    )
}