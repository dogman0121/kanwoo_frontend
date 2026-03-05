import { fetchApi } from "@/lib/api/fetchApi";

export async function PUT(
    request: Request,
    { params }: {params: Promise<{profileSlug: string}>}
) {
    const {profileSlug} = await params;

    return fetchApi(request, `/profile/${profileSlug}`, {
        method: "PUT",
        body: request.body
    })
}