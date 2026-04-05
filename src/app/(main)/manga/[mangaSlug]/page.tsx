import { notFound } from "next/navigation";
import { Metadata } from "next";
import { serverFetch } from "@/lib/fetch/serverFetch";
import MangaPermission from "@/types/manga/mangaPermission";
import MangaProvider from "./_components/MangaProvider";
import ReadingProgress from "@/types/manga/readingProgress";
import MobileMangaPage from "./_components/MobileMangaPage";
import DesktopMangaPage from "./_components/DesktopMangaPage";
import Manga from "@/types/manga/manga";
import { ApiError } from "@/lib/fetch/apiResponse";

interface MangaSchema {
    manga: Manga,
    mangaPermissions: MangaPermission,
    readingProgress: ReadingProgress
}

export async function generateMetadata({
    params 
}: {
    params: Promise<{mangaSlug: string}>
}): Promise<Metadata> {
    const { mangaSlug } = await params;

    const {data: mangaData} = await serverFetch.get<MangaSchema>(`/manga/${mangaSlug}`)

    if (!mangaData.manga){
        return notFound()
    }

    return {
        title: `Читать ${mangaData.manga.type.name} ${mangaData.manga.name} онлайн | kanwoo`,
        description: mangaData.manga.description,
        openGraph: {
            type: "book",
            url: `https://kanwoo.ru/manga/${mangaData.manga.slug}`,
            title: `Читать ${mangaData.manga.type.name} ${mangaData.manga.name} онлайн | kanwoo`,
            description: mangaData.manga.description,
            images: [{url: mangaData.manga.poster?.medium || "https://cdn.kanwoo.ru/manga/default"}],
            siteName: "Kanwoo"
        },
    }
}



export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{mangaSlug: string}>,
    searchParams: Promise<{ viewport: string }>
}) {
    const { mangaSlug } = await params;

    const { viewport } = await searchParams;

    try {
        const {data: mangaData} = await serverFetch.get<MangaSchema>(`/manga/${mangaSlug}`)

        return ( 
            <MangaProvider 
                manga={mangaData.manga}
                mangaPermission={mangaData.mangaPermissions}
                readingProgress={mangaData.readingProgress}
            >
                {viewport == "mobile" ?
                    <MobileMangaPage/>
                    :
                    <DesktopMangaPage/>
                }
            </MangaProvider>
        )
    } catch (e) {
        if (e instanceof ApiError) {
            if (e.code == "not_found")
                return notFound();
        }
    }
}