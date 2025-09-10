import { notFound } from "next/navigation";
import { Metadata } from "next";
import MangaPageMobile from "./MangaPageMobile";
import MangaPageDesktop from "./MangaPageDesktop";


export async function generateMetadata({
    params 
}: {
    params: Promise<{mangaSlug: string}>
}): Promise<Metadata> {
    const { mangaSlug } = await params;

    const res = await fetch(`https://kanwoo.ru/api/v1/manga/${mangaSlug}`)

    const {data: manga} = await res.json();

    if (!manga)
        return notFound();
 
  return {
    title: `Читать ${manga.type.name} ${manga.name} онлайн | kanwoo`,
    description: manga.description,
    openGraph: {
        type: "book",
        url: `https://kanwoo.ru/manga/${manga.slug}`,
        title: `Читать ${manga.type.name} ${manga.name} онлайн | kanwoo`,
        description: manga.description,
        images: [{url: manga.main_poster.medium}],
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

    const res = await fetch(`https://kanwoo.ru/api/v1/manga/${mangaSlug}`)

    const {data: manga} = await res.json();

    const { viewport } = await searchParams;

    if (!manga)
        return notFound();
    else

    return ( 
        <>
            {viewport == "mobile" ?
                <MangaPageMobile manga={manga}/>
                :
                <MangaPageDesktop manga={manga}/>
            }
        </>
    )
}