"use client"

import { Paper } from "@mui/material"
import Login from "./Login"
import Register from "./Register"
import Forgot from "./Forgot"
import Recovery from "./Recovery"
import { useAppSelector } from "@/lib/state/hooks"
import { selectSection } from "@/features/global/states/auth/slice"
import { AuthSection } from "@/features/auth/types"
import ProfileChoose from "./ProfileChoose"
import { ProfileCreate } from "./ProfileCreate"

export const YANDEX_OAUTH_CONTAINER_ID = "yandex_oauth_container"

export default function Auth() {

    const section = useAppSelector(selectSection)

    return (
        <Paper
            sx={{
                padding: "16px 24px 20px",
                border: "none",
                borderRadius: "20px",
            }}
        >
            {section == AuthSection.LOGIN && <Login />}
            {section == AuthSection.REGISTER && <Register />}
            {section == AuthSection.RECOVERY && <Recovery />}
            {section == AuthSection.FORGOT && <Forgot />}
            {section == AuthSection.CHOOSE_PROFILE && <ProfileChoose />}
            {section == AuthSection.CREATE_PROFILE && <ProfileCreate />}
        </Paper>
    )
}