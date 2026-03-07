import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi"
import Manga from "@/types/manga/manga"
import MangaPermission from "@/types/manga/mangaPermission"
import { NextRequest } from "next/server"

export interface GetStudioPageManga {
    manga: Manga,
    mangaPermission: MangaPermission
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const { mangaSlug } = await params

    return await fetchManyApi(
        request, 
        [
            {name: "manga", url: `/manga/${mangaSlug}`, method: HTTP_METHODS.GET},
            {name: "mangaPermission", url: `/manga/${mangaSlug}/permissions`, method: HTTP_METHODS.GET}
        ]
    )
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const {mangaSlug} = await params;

    return fetchApi(request, `/manga/${mangaSlug}`, HTTP_METHODS.DELETE)
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const {mangaSlug} = await params

    return fetchApi(request, `/manga/${mangaSlug}`, HTTP_METHODS.PUT)
}