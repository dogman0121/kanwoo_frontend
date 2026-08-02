import MobileCatalogPage from "./MobileCatalogPage"
import DesktopCatalogPage from "./DesktopCatalogPage"

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined, viewport: string }>
}) {
    const { viewport } = await searchParams;

    return (
        <>
            {viewport == "mobile" ?
                <MobileCatalogPage />
                :
                <DesktopCatalogPage />
            }
        </>
    )
}