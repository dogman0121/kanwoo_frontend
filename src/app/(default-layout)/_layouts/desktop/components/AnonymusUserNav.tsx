"use client"

import { setAuthModalOpen } from "@/features/global/states/app/slice";
import { useAppDispatch } from "@/lib/state/hooks";
import { Button } from "@mui/material";

export default function AnonymusUserNav() {
    const dispatch = useAppDispatch()

    return (
        <>
            <Button
                onClick={() => {dispatch(setAuthModalOpen(true))}}
                variant="contained"
                sx={{
                    width: "100px",
                    mx: "10px"
                }}
            >
                Войти
            </Button>
            
        </>
    )
}