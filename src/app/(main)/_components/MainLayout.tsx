import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { headers } from "next/headers";
import { profileServerApi } from "@/lib/api/features/profile/server";
import MetaProvider from "./MetaProvider";
import ProfileProvider from "./ProfileProvider";
import { metaServerApi } from "@/lib/api/features/meta/server";

export default async function MainLayout({children}: {children: React.ReactNode}) {
    const device = (await headers()).get("X-Device-Type")

    const profile = await profileServerApi.getCurrentProfile()

    const meta = await metaServerApi.getMetaInfo() 

    return (
        <MetaProvider meta={meta}>
            <ProfileProvider profile={profile}>
                { device == "mobile" ? 
                    <MobileLayout>
                        {children}
                    </MobileLayout>
                    :
                    <DesktopLayout>
                        {children}
                    </DesktopLayout>
                }
            </ProfileProvider>  
        </MetaProvider>
    )
}