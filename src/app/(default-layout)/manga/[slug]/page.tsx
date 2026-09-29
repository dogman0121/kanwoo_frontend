import { notFound } from "next/navigation";
import { Metadata } from "next";
import { mangaServerApi } from "@/lib/fetch/features/manga/server.api";
import PPage from "./PPage";


export async function generateMetadata({
    params 
}: {
    params: Promise<{slug: string}>
}): Promise<Metadata> {
    const { slug } = await params;
    
    const {data: manga} = await mangaServerApi.getManga(slug)

    return {
        title: `Читать ${manga.type.name} ${manga.name} онлайн | kanwoo`,
        description: manga.description,
        openGraph: {
            type: "book",
            url: `https://kanwoo.ru/manga/${manga.slug}`,
            title: `Читать ${manga.name} онлайн | kanwoo`,
            description: manga.description,
            images: [{url: manga.poster.medium || "https://cdn.kanwoo.ru/manga/default"}],
            siteName: "Kanwoo"
        },
    }
}



export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{slug: string}>,
    searchParams: Promise<{ viewport: string }>
}) {
    const { slug } = await params;

    const { viewport } = await searchParams;

    const response = await mangaServerApi.getMangaPage(slug)

    if (!response.data.manga)
        return notFound()

    return ( 
        <PPage
            manga={response.data.manga}
            mangaMetadata={response.metadata.manga}
            mangaContext={response.context.manga}
            readingProgress={response.data.progress}
            readingProgressMetadata={response.metadata.progress}
            readingProgressContext={response.context.progress}
            deviceType={viewport}
        />
    )
}