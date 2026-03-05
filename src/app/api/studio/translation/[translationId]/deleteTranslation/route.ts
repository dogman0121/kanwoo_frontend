import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(request: Request, {
    params
}: {
    params: Promise<{translationId: string}>
}) {
    const { translationId } = await params;

    return await fetchApi(request, `/translations/${translationId}`, {method: "DELETE"})
}