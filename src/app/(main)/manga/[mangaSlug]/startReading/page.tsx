import { serverFetch } from "@/lib/fetch/serverFetch";
import Chapter from "@/types/chapter/chapter";
import Translation from "@/types/translation/translation";
import { redirect } from "next/navigation"

export default async function Page({
    params
}: {
    params: Promise<{mangaSlug: string}>
}) {
    const { mangaSlug } = await params;

    const {data: translations} = await serverFetch.get<Translation[]>(`/manga/${mangaSlug}/getTranslations`)

    if (translations.length == 0) {
        return redirect(`/manga/${mangaSlug}`)
    }
    else {
        const {data: chapters} = await serverFetch.get<Chapter[]>(`/translation/${translations[0].id}/getChapters`)

        return redirect(`/chapters/${chapters[0].id}`)
    }

    return (
        <></>
    )
}