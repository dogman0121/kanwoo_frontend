import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(
    request: Request, {
    params
}: {
    params: Promise<{translationId: string}>
}) {
    const { translationId } = await params;

    return await fetchManyApi(request, [
        {name: "translation", url: `/translations/${translationId}`, method: HTTP_METHODS.GET},
        {name: "translationPermissions", url: `/translations/${translationId}/permissions`, method: HTTP_METHODS.GET},
    ])
}

export async function DELETE(request: Request, {
    params
}: {
    params: Promise<{translationId: string}>
}) {
    const { translationId } = await params;

    return await fetchApi(request, `/translations/${translationId}`, HTTP_METHODS.DELETE)
}

export async function PUT(request: Request, {
    params
}: {
    params: Promise<{translationId: string}>
}) {
    const { translationId } = await params;

    return await fetchApi(request,  `/translations/${translationId}`, HTTP_METHODS.PUT)
}