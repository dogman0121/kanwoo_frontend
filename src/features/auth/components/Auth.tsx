"use client"

import { Paper } from "@mui/material"
import Login from "./Login"
import Register from "./Register"
import Forgot from "./Forgot"
import Recovery from "./Recovery"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { selectSection, setSection } from "@/features/auth/states/auth/slice"
import { AuthSection } from "@/features/auth/types"
import ProfileChoose from "./ProfileChoose"
import { ProfileCreate } from "./ProfileCreate"
import { useEffect } from "react"
import Wrapper from "./Wrapper"

export const YANDEX_OAUTH_CONTAINER_ID = "yandex_oauth_container"

export default function Auth({
    section
}: {
    section?: AuthSection
}) {
    const dispatch = useAppDispatch()

    const currSection = useAppSelector(selectSection)

    useEffect(() => {
        if (section) {
            dispatch(setSection(section))
        }
    }, [section])

    return (
        <Wrapper>
            <Paper
                sx={{
                    padding: "16px 24px 20px",
                    borderRadius: "20px",

                    border: "none",
                }}
            >
                {currSection == AuthSection.LOGIN && <Login />}
                {currSection == AuthSection.REGISTER && <Register />}
                {currSection == AuthSection.RECOVERY && <Recovery />}
                {currSection == AuthSection.FORGOT && <Forgot />}
                {currSection == AuthSection.CHOOSE_PROFILE && <ProfileChoose />}
                {currSection == AuthSection.CREATE_PROFILE && <ProfileCreate />}
            </Paper>
        </Wrapper>
    )
}