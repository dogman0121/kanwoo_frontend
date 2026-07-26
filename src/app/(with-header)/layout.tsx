
import { Children } from "react"
import { headers } from "next/headers"
import MobileLayout from "../_layouts/MobileLayout"
import DesktopLayout from "../_layouts/DesktopLayout"


export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {

    const device = (await headers()).get("X-Device-Type")


    return (
        <>
            { device == "mobile" ? 
                <MobileLayout>
                    {Children.map(children, c => c)}
                </MobileLayout>
                :
                <DesktopLayout>
                    {Children.map(children, c => c)}
                </DesktopLayout>
            }
        </>  
        
    )
}