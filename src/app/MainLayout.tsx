import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { cookies, headers } from "next/headers";
import { serverFetch } from "@/lib/api/serverFetch";

export default async function MainLayout({children}: {children: React.ReactNode}) {
    const device = (await headers()).get("X-Device-Type")
    const cookieStore = await cookies()

    console.log(cookieStore.get("access_token_cookie")?.value)
    const {data: user} = await serverFetch.get("/users/me",
        {
            credentials: "include",
            headers: {
                "cookie": `access_token_cookie=${cookieStore.get("access_token_cookie")?.value || ""};`
            }
        }
    )

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