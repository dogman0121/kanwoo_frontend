import { range } from "lodash";
import { GenresContainer } from "../Genres";
import { Chip, Skeleton } from "@mui/material";

export default function GenresSkeleton() {
    return (
        <GenresContainer>
            {range(0, 3).map(idx => (
                <Skeleton variant="rounded" width={54} height={32} sx={{ borderRadius: '16px' }} />
            ))}
        </GenresContainer>
    )
}