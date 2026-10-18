import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import DesktopPage from "./DesktopPage"
import MobilePage from "./MobilePage"
import { selectCreateTranslationDialogOpen } from "@/features/studio/states/profile/page.slice"
import CreateTranslationDialog from "@/features/studio/components/CreateTranslationDialog"
import { setCreateTranslationDialogOpen } from "@/features/studio/states/profile/page.slice"

export default function PPage() {
    const dispatch = useAppDispatch()

    const deviceType = useAppSelector(selectDeviceType)

    const createTranslationDialogOpen = useAppSelector(selectCreateTranslationDialogOpen)

    const handleCloseDialog = () => {
        dispatch(setCreateTranslationDialogOpen(false))
    }

    return (
        <>
            {deviceType == "desktop" ?
                <DesktopPage />
                :
                <MobilePage />
            }
            <CreateTranslationDialog 
                open={createTranslationDialogOpen}
                onClose={handleCloseDialog}
            />
        </>
    )
}