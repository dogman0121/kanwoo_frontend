import { selectAuthProfile } from "@/features/auth/states/auth-profile";
import { setAuthSnackbarOpen } from "@/features/global/states/app/slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Button, ButtonProps } from "@mui/material";
import { useTransition } from "react";

export type AppButtonProps = ButtonProps & {
    authRequired?: boolean,
    loadingEnabled?: boolean
}

export default function AppButton({
    authRequired = false,
    loadingEnabled = false,
    onClick,
    loading,
    ...props
}: AppButtonProps) {
    const dispatch = useAppDispatch()
    
    const authProfile = useAppSelector(selectAuthProfile)

    const [isPending, setIsPending] = useTransition()

    const handleClick = (e: any) => {
        if (!onClick)
            return

        if (!authProfile && authRequired) {
            dispatch(setAuthSnackbarOpen(true))
            return
        }

        if (loadingEnabled) {
            setIsPending(async () => {
                await onClick?.(e)
            })
        } else {
            onClick?.(e)
        }
    }

    return (
        <Button 
            loading={loading || isPending}
            onClick={handleClick}
            {...props}
        />
    )
}