import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{profileSlug: string}> }
) {
    const { profileSlug } = await params

    return await fetchApi(request, `/profiles/${profileSlug}/manga`, HTTP_METHODS.GET)
}

export async function POST(request: Request) {
    return fetchApi(request, `/manga`, HTTP_METHODS.POST)
}