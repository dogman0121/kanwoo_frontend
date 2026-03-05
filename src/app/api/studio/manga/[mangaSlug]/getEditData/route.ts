import { fetchApi, fetchManyApi } from "@/lib/api/fetchApi";
import MangaEditData from "@/types/manga/mangaEditData";
import { NextRequest } from "next/server";

export type GetStudioMangaEditData = MangaEditData

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const { mangaSlug } = await params

    return await fetchApi(request, `/manga/${mangaSlug}/forms/edit`, {method: "GET"})
}