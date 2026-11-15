"use client"

import EditLayout from "@/components/edit/EditLayout"
import { notFound, useParams } from "next/navigation";
import { ApiError } from "@/lib/fetch/api-response.types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/state/hooks";
import { studioClientAPI } from "@/features/studio/api/client.api";
import { setStudioProfile } from "@/features/studio/states/profile/page.slice";
import EditBody from "@/components/edit/EditBody";
import ProfileStudioDrawer from "@/features/studio/drawers/ProfileStudioDrawer";



export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch()

    const { slug } = useParams<{slug: string}>()

    const [isNotFound, setIsNotFound] = useState(false)

    const fetchProfile = async (slug: string) => {
        try {
            const response = await studioClientAPI.getProfile(slug)

            if (!response.data)
                return setIsNotFound(true)

            dispatch(setStudioProfile({
                data: response.data,
                context: response.context,
                permission: response.permission,
            }))
            setIsNotFound(false)
        } catch (e) {
            if (e instanceof ApiError) {
                return setIsNotFound(true)
            }

            throw e
        }
        
    }

    useEffect(() => {
        fetchProfile(slug)
    }, [slug])

    if (isNotFound) {
        notFound()
    }

    return (
        <EditLayout>
            <ProfileStudioDrawer />
            <EditBody>
                {children}
            </EditBody>
        </EditLayout>
    )
}