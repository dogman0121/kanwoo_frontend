"use client"

import EditLayout from "@/features/edit/components/EditLayout"
import StudioProfileProvider from "./_components/StudioProfileProvider";
import { notFound, useParams } from "next/navigation";
import { ApiError } from "@/lib/fetch/apiResponse";
import StudioProfileDrawer from "./_components/StudioProfileDrawer";
import { Box } from "@mui/material";
import Profile from "@/types/profile/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import { serverFetch } from "@/lib/fetch/serverFetch";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { useEffect, useState } from "react";

export default function Layout({
    children
}: LayoutProps<"/studio/profiles/[profileSlug]">) {

    const [studioProfile, setStudioProfile] = useState<Profile|null>(null)
    const [studioProfilePermission, setStudioProfilePermission] = useState<ProfilePermission|null>(null)

    const { profileSlug } = useParams<{profileSlug: string}>()

    const [isNotFound, setIsNotFound] = useState(false)

    useEffect(() => {
        clientFetch.get<{
            profile: Profile, 
            profilePermission: ProfilePermission
        }>(`/studio/profiles/${profileSlug}`)
        .then((response) => {
            setStudioProfile(response.data.profile)
            setStudioProfilePermission(response.data.profilePermission)
        }).catch((error: ApiError) => {
            if (error.code == "not_found"){
                setIsNotFound(true)
            }
            else
                throw error
        })
    }, [])

    if (isNotFound) {
        notFound()
    }

    return (
        <EditLayout>
            <StudioProfileProvider
                profile={studioProfile}
                profilePermission={studioProfilePermission}
            >
                <StudioProfileDrawer/>
                <Box
                    sx={{
                        width: "100%"
                    }}
                >
                    {children}
                </Box>
            </StudioProfileProvider>
        </EditLayout>
    )
}