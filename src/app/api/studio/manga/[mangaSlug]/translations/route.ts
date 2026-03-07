import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}>}
) {
    const { mangaSlug } = await params;

    return await fetchApi(request, `/manga/${mangaSlug}/translations?official=true&full=True`, HTTP_METHODS.GET)
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const {mangaSlug} = await params;

    return await fetchApi(request, `/manga/${mangaSlug}/translations`, HTTP_METHODS.POST)
}