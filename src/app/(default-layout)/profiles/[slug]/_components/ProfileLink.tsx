import { Chip, Icon } from "@mui/material";
import { ProfileLink as LinkType } from "@/types/profile"
import Link from "next/link";
import LinkImage from "./LinkImage";

export default function LinkBlock({
    link
}: {
    link: LinkType
}) {
    return (
        <Link target="_blank" href={link.link}>
            <Chip 
                icon={
                    <LinkImage link={link.link}/>
                } 
                label={link.name}
                sx={{
                    "& .MuiChip-icon": {
                        ml: "10px"
                    }
                }}
            />
        </Link>
    )
}