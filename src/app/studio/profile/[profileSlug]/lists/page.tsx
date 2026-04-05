"use client"

import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditHeader from "@/features/edit/components/EditHeader"
import { Button } from "@mui/material"
import Link from "next/link"
import { useAppSelector } from "@/lib/state/hooks"

export default function Page() {
    const profile = useAppSelector(state => state.studioPageProfile.profile);

    if (!profile)
        return null;
    
    return (
        <>
            <EditHeader>Мои списки</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                        >
                            Создать
                        </Button>
                    </>
                }
            />
        </>
    )
}