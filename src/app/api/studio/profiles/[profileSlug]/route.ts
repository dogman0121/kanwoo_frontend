import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{profileSlug: string}>}
) {
    const {profileSlug} = await params;

    const response = await fetchManyApi(
        request,
        [
            { name: "profile", url:`/profiles/${profileSlug}`, method: HTTP_METHODS.GET },
            { name: "profilePermission", url:`/profiles/${profileSlug}/permissions`, method: HTTP_METHODS.GET }
        ]
    )

    const clonedResponse = response.clone()

    const clonedResponseJson = await clonedResponse.json();

    if (!clonedResponseJson.data.profilePermission.edit){
        return new Response(JSON.stringify({
            error: {
                code: "not_found",
                detail: null
            }
        }), {
            status: 404
        })
    }

    return response
}

export async function PUT(
    request: Request,
    { params }: {params: Promise<{profileSlug: string}>}
) {
    const {profileSlug} = await params;

    return fetchApi(request, `/profiles/${profileSlug}`, HTTP_METHODS.PUT)
}