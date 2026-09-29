"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import InfoModal from "./_components/InfoModal";
import DesktopPage from "./DesktopPage";
import MobilePage from "./MobilePage";
import { selectInfoModalOpen } from "@/lib/state/features/profile-page/page/selectors";
import { setInfoModalOpen } from "@/lib/state/features/profile-page/page/slice";

export default function ProfilePage({
    deviceType,
}: {
    deviceType: "mobile" | "desktop",
}) {
    const dispatch = useAppDispatch()

    const infoModalOpen = useAppSelector(selectInfoModalOpen)

    return (
        <>
            {deviceType == "mobile" ?
                <MobilePage />
                :
                <DesktopPage />
            }
            <InfoModal 
                open={infoModalOpen}
                onClose={() => dispatch(setInfoModalOpen(false))}
            />
        </>
    )
}