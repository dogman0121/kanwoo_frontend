import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import MangaDesktopPage from "@/features/manga/pages/MangaDesktopPage";
import MangaMobilePage from "@/features/manga/pages/MangaMobilePage";
import { mangaServerApi } from "@/features/manga/api/server.api";


export async function generateMetadata({
    params 
}: {
    params: Promise<{slug: string}>
}): Promise<Metadata> {
    const { slug } = await params;

    const {data: metadata} = await mangaServerApi.getMangaMetadata(slug)

    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            type: metadata.type,
            url: metadata.canonical,
            title: metadata.title,
            description: metadata.description,
            images: [{url: metadata.image || "https://cdn.kanwoo.ru/manga/default"}],
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
        <>
            {viewport == "desktop" ?
                <Suspense>
                    <MangaDesktopPage 
                        manga={{
                            data: response.data.manga,
                            context: response.context.manga
                        }}
                        readingProgress={{
                            data: response.data.progress,
                            context: response.context.progress
                        }}
                    />
                </Suspense>
                :
                <Suspense>
                    <MangaMobilePage
                        manga={{
                            data: response.data.manga,
                            context: response.context.manga
                        }}
                        readingProgress={{
                            data: response.data.progress,
                            context: response.context.progress
                        }}
                    />
                </Suspense>
            }
        </>
    )
}