import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function PUT(
    request: Request,
    { params }: {params: Promise<{profileSlug: string}>}
) {
    const {profileSlug} = await params;

    return fetchApi(request, `/profile/${profileSlug}`, HTTP_METHODS.PUT)
}