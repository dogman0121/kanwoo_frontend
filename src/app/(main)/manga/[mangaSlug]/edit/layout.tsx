import EditPage from "@/features/edit/EditPage";
import EditLayout from "@/features/edit/EditLayout";
import EditSections from "@/features/edit/EditSections";
import MangaProvider from "./_components/MangaProvider";
import { mangaServerApi } from "@/lib/api/features/manga/server";
import { notFound } from "next/navigation";
import NavDrawer from "./_components/Drawer";
import MangaPanel from "./_components/MangaPanel";
import Drawer from "./_components/Drawer";
import EditBody from "@/features/edit/EditPage";
import { Box, Toolbar } from "@mui/material";

export default async function Layout({
    children,
    params
}: Readonly<{
    children: React.ReactNode,
    params: Promise<{mangaSlug: string}>
}>) {
    const {mangaSlug} = await params

    const manga = await mangaServerApi.getManga(mangaSlug)

    if (!manga)
        return notFound()

    return (
        <>
            <MangaPanel manga={manga}/>
            <EditLayout>
                <Drawer />
                <EditBody>
                    {children}
                </EditBody>
            </EditLayout>
        </>
    )
}