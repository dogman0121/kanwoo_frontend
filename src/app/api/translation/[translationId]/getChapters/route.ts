import { fetchApi } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{translationId: string}> }
) { 
    const { translationId } = await params;

    return fetchApi(request, `/translations/${translationId}/chapters`, {method: "GET"})
}