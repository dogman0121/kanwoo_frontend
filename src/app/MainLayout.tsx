import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { headers } from "next/headers";
import { serverFetch } from "@/lib/api/serverFetch";
import AuthUserSetter from "./AuthUserLoader";

export default async function MainLayout({children}: {children: React.ReactNode}) {
    const device = (await headers()).get("X-Device-Type")

    const {data: user} = await serverFetch.get("https://kanwoo.ru/api/v1/users/me")

    return (
        <>  
            <AuthUserSetter user={user} />
            { device == "mobile" ? 
                <MobileLayout>
                    {children}
                </MobileLayout>
                :
                <DesktopLayout>
                    {children}
                </DesktopLayout>
            }
        </>
    )
}