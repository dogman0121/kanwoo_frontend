import { fetchApi } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}>}
) {
    const { mangaSlug } = await params;

    return await fetchApi(request, `/manga/${mangaSlug}/translations?official=true&full=True`, {method: "GET"})
}