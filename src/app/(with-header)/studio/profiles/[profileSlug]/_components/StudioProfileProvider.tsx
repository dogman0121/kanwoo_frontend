"use client"

import { setStudioPageProfile, setStudioPageProfilePermissions } from "@/lib/state/features/studioPage/studioPageProfileSlice"
import Profile from "@/types/profile/profile"
import ProfilePermission from "@/types/profile/profilePermission"
import { Children, useEffect } from "react"
import { useDispatch } from "react-redux"

export default function StudioProfileProvider({
    profile,
    profilePermission,
    children
}: {
    profile: Profile | null,
    profilePermission: ProfilePermission | null,
    children: React.ReactNode
}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStudioPageProfile(profile)),
        dispatch(setStudioPageProfilePermissions(profilePermission))
    }, [profile, profilePermission])

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}