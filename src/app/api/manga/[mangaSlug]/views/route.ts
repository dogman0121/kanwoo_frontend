import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"

export async function POST(request: Request, {
    params
}: {
    params: Promise<{mangaSlug: string}>
}) {
    const {mangaSlug} = await params

    return fetchApi(request, `/manga/${mangaSlug}/views`, HTTP_METHODS.POST)
}