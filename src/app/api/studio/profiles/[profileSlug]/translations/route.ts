import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{profileSlug: string}> }
) {
    const {profileSlug} = await params;

    return fetchApi(request, `/profiles/${profileSlug}/translations?full=true`, HTTP_METHODS.GET)
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{profileSlug: string}> }
) {
    const {profileSlug} = await params;

    return fetchApi(request, `/profiles/${profileSlug}/translations`, HTTP_METHODS.POST)
}