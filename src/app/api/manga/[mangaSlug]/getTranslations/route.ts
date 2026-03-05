import MangaSlug from "@/app/(main)/studio/_features/manga/components/MangaSlug";
import { fetchApi } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const { mangaSlug } = await params;

    return await fetchApi(request, `/manga/${mangaSlug}/translations`, {method: "GET"})
}