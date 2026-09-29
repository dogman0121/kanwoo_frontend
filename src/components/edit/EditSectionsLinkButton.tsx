"use client"

import { ListItemButtonProps, styled } from "@mui/material";
import EditSectionsButton from "./EditSectionsButton";
import { useRouter } from "next/navigation";


export default function EditSectionsLinkButton({link, ...props}: ListItemButtonProps & {link: string}) {
    const router = useRouter()
    return (
        <EditSectionsButton 
            onClick={() => router.push(link)} 
            {...props}
        />
    )
}