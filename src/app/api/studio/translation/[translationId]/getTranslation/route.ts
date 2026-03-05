import { fetchManyApi } from "@/lib/api/fetchApi";

export async function GET(
    request: Request, {
    params
}: {
    params: Promise<{translationId: string}>
}) {
    const { translationId } = await params;

    return await fetchManyApi(request, [
        {name: "translation", url: `/translations/${translationId}`, options: {method: "GET"}},
        {name: "translationPermissions", url: `/translations/${translationId}/permissions`, options: {method: "GET"}},
    ])
}