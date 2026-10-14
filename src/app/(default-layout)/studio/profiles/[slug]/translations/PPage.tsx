import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppSelector } from "@/lib/state/hooks"
import DesktopPage from "./DesktopPage"
import MobilePage from "./MobilePage"

export default function PPage() {
    const deviceType = useAppSelector(selectDeviceType)

    return (
        <>
            {deviceType == "desktop" ?
                <DesktopPage />
                :
                <MobilePage />
            }
        </>
    )
}