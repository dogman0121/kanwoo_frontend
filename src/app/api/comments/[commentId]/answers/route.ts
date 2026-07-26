import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"

export async function GET(request: Request, {
    params
}: {
    params: Promise<{commentId: string}>
}) {
    const {commentId} = await params;

    return fetchApi(
        request, 
        `/comments/${commentId}/answers`, 
        HTTP_METHODS.GET
    )
}