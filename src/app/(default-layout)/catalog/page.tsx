import MobilePage from "./MobilePage"
import DesktopPage from "./DesktopPage"

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined, viewport: string }>
}) {
    const { viewport } = await searchParams;

    return (
        <>
            {viewport == "mobile" ?
                <MobilePage />
                :
                <DesktopPage />
            }
        </>
    )
}