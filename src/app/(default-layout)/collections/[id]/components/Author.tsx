import { routes, toHref } from "@/constants/routes/main.routes"
import { Profile } from "@/types/profile"
import { Avatar, Box, Chip, Typography } from "@mui/material"
import Link from "next/link"

export default function Author({
    author
}: {
    author: Profile
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2
            }}
        >
            <Typography>Автор:</Typography>
            <Link href={toHref(routes.profiles.item, {slug: author.slug})}>
                <Chip avatar={<Avatar src={author.avatar} />} label={author.name}/>
            </Link>
        </Box>
    )
}