"use client"

import { setAuthUser } from "@/lib/state/features/auth_user/authUserSlice"
import { useAppStore } from "@/lib/state/hooks"
import User from "@/types/user"
import { useRef } from "react"

export default function AuthUserSetter({user}: {user: null | User}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setAuthUser(null))
        initialized.current = true
    }

    return (<></>)
}