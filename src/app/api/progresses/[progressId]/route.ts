import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function DELETE(request: Request, 
    { params }: { params: Promise<{progressId: string}> }
) {
    const { progressId } = await params;

    return fetchApi(request, `/progresses/${progressId}`, HTTP_METHODS.DELETE)
}