import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{profileSlug: string}>}
) {
    const {profileSlug} = await params;

    return fetchManyApi(
        request,
        [
            { name: "profile", url:`/profiles/${profileSlug}`, method: HTTP_METHODS.GET },
            { name: "profilePermission", url:`/profiles/${profileSlug}/permissions`, method: HTTP_METHODS.GET }
        ]
    )
}

export async function PUT(
    request: Request,
    { params }: {params: Promise<{profileSlug: string}>}
) {
    const {profileSlug} = await params;

    return fetchApi(request, `/profile/${profileSlug}`, HTTP_METHODS.PUT)
}