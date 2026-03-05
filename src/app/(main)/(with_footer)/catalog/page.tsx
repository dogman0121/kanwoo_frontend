import SearchInputDesktop from "@/features/search/components/SearchInputDesktop"
import SearchProvider from "@/features/search/components/SearchProvider"
import { Box, Container, Typography } from "@mui/material"
import Filters from "./_components/Filters"
import MobileCatalogPage from "./_components/MobileCatalogPage"
import DesktopCatalogPage from "./_components/DesktopCatalogPage"

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