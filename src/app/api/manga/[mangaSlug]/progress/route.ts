import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"

export async function DELETE(request: Request, {
    params
}: {
    params: Promise<{mangaSlug: string}>
}) {
    const {mangaSlug} = await params;

    return fetchApi(
        request, 
        `/manga/${mangaSlug}/progress`, 
        HTTP_METHODS.DELETE
    )
}