import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { selectIsHydrated } from "../states/reading-settings/selectors"
import { useEffect } from "react"
import { loadSettings } from "../states/reading-settings/slice"

export default function useReadingSettings() {
    const dispatch = useAppDispatch()

    const hydrated = useAppSelector(selectIsHydrated)

    useEffect(() => {
        dispatch(loadSettings())
    }, [])

    return {
        settingsLoaded: hydrated,
    }
}