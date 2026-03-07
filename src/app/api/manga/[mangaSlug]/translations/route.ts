import MangaSlug from "@/app/(main)/studio/_features/manga/components/MangaSlug";
import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const { mangaSlug } = await params;

    return await fetchApi(request, `/manga/${mangaSlug}/translations`, HTTP_METHODS.GET)
}