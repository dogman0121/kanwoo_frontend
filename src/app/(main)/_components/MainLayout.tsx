import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { headers } from "next/headers";
import Footer from "./Footer";


export default async function MainLayout({children}: {children: React.ReactNode}) {
    const device = (await headers()).get("X-Device-Type")

    return (
        <>
            { device == "mobile" ? 
                <MobileLayout>
                    {children}
                </MobileLayout>
                :
                <DesktopLayout>
                    {children}
                </DesktopLayout>
            }
            <Footer />
        </>  
    )
}