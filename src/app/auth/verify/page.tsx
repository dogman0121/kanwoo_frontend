"use client"

import { AuthSection } from "@/features/auth/types/AuthPanel"
import Auth from "@/features/auth/components/Auth"

export default function Page() {
    return (
        <Auth 
            defaultSection={AuthSection.VERIFY}
        />
    )
}