import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"

export async function POST(
    request: Request,
    { params }: { params: Promise<{collectionId: string}> }
) {
    const { collectionId } = await params

    return fetchApi(request, `/collections/${collectionId}/manga`, HTTP_METHODS.PATCH)
}