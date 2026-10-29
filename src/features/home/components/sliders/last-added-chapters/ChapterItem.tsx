import Poster from "@/components/poster/Poster";
import { routes, toHref } from "@/constants/routes/main.routes";
import { Entity } from "@/lib/types/Entity.type";
import { Chapter, ChapterContext } from "@/types/chapter";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function ChapterItem({
    chapter,
}: {
    chapter: Entity<Chapter, ChapterContext>,
}) {
    return (
        <Link href={toHref(routes.chapters.item, {id: chapter.data.id.toString()})}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3
                }}
            >
                <Poster 
                    width="72px"
                    src={chapter.context?.manga.poster?.small}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Box>
                        <Typography>{chapter.context?.manga.name}</Typography>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                        >
                            Глава {chapter.data.chapter}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Link>
    )
}