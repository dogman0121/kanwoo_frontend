import MobileLayout from "../../_layouts/MobileLayout";
import DesktopLayout from "../../_layouts/DesktopLayout";
import { headers } from "next/headers";
import Footer from "../../_layouts/Footer";


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