import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { headers } from "next/headers";
import { serverFetch } from "@/lib/api/serverFetch";

export default async function MainLayout({children}: {children: React.ReactNode}) {
    const device = (await headers()).get("X-Device-Type")

    const {data: user} = await serverFetch.get("/users/me")

    return (
        <>  
            { device == "mobile" ? 
                <MobileLayout user={user}>
                    {children}
                </MobileLayout>
                :
                <DesktopLayout user={user}>
                    {children}
                </DesktopLayout>
            }
        </>
    )
}