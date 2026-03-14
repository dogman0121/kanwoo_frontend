"use client"

import { AuthSection } from "@/features/auth/types/AuthPanel"
import Auth from "@/features/auth/components/Auth"
import { Suspense } from "react"

export default function Page() {
    return (
        <Suspense fallback={<></>}>
            <Auth 
                defaultSection={AuthSection.VERIFY}
            />
        </Suspense>
    )
}