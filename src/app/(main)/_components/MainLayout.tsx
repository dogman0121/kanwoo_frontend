import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { headers } from "next/headers";
import { profileServerApi } from "@/lib/api/features/profile/server";

export default async function MainLayout({children}: {children: React.ReactNode}) {
    const device = (await headers()).get("X-Device-Type")

    const profile = await profileServerApi.getCurrentProfile()

    return (
        <>  
            { device == "mobile" ? 
                <MobileLayout profile={profile}>
                    {children}
                </MobileLayout>
                :
                <DesktopLayout profile={profile}>
                    {children}
                </DesktopLayout>
            }
        </>
    )
}