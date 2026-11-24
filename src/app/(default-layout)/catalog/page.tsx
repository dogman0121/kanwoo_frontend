import CatalogPageMobile from "@/features/catalog/pages/CatalogPageMobile";
import CatalogPageDesktop from "@/features/catalog/pages/CatalogPageDesktop";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined, viewport: string }>
}) {
    const { viewport } = await searchParams;

    return (
        <>
            {viewport == "mobile" ?
                <CatalogPageMobile />
                :
                <CatalogPageDesktop />
            }
        </>
    )
}