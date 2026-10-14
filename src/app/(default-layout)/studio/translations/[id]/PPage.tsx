import { useAppSelector } from "@/lib/state/hooks"
import { DesktopPage } from "./DesktopPage"
import { MobilePage } from "./MobilePage"
import { selectDeviceType } from "@/features/global/states/app/slice"

export default function PPage() {
    const deviceType = useAppSelector(selectDeviceType)

    return (
        <>
            {deviceType == "mobile" ?
                <MobilePage />
                :
                <DesktopPage />
            }
        </>
    )
}