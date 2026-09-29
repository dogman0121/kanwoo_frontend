"use client"

import Head from "next/head";
import DesktopPage from "./DesktopPage";
import MobilePage from "./MobilePage";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { useEffect } from "react";
import { selectAuthProfile } from "@/features/global/states/auth-profile";
import { notFound } from "next/navigation";
import { selectAddMangaDialogOpen, selectEditDialogOpen, setAddMangaDialogOpen, setEditDialogOpen } from "@/features/collection/states/collection-page/slice";
import EditDialog from "@/features/collection/components/EditDialog";
import AddMangaDialog from "./[id]/components/AddMangaDialog";
import { fetchCollections } from "@/features/collection/states/lib/thunks";

export default function PPage({
    deviceType
}: {
    deviceType: string
}) {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)

    if (!authProfile)
        return notFound()

    useEffect(() => {
        dispatch(fetchCollections())
    }, [])

    return (
        <>
            <Head>
                <title>Коллекции</title>
            </Head>
            {deviceType == "desktop" ? 
                <DesktopPage />
                :
                <MobilePage />
            }

        </>
    )
}