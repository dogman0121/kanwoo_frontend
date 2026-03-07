import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{chapterId: string}> }
) {
    const { chapterId } = await params;
    
    return fetchApi(request, `/chapters/${chapterId}`, HTTP_METHODS.DELETE)
}

export async function GET(request: Request, {
    params
}: {
    params: Promise<{chapterId: string}>
}) {
    const { chapterId } = await params;

    return fetchManyApi(request, [
        {name: "chapter", url: `/chapters/${chapterId}`, method: HTTP_METHODS.GET},
        {name: "chapterPermissions", url: `/chapters/${chapterId}/permissions`, method: HTTP_METHODS.GET}
    ])
}

export async function PUT(request: Request, {
    params
}: {
    params: Promise<{chapterId: string}>
}) {
    const { chapterId } = await params;

    return await fetchApi(request,  `/chapters/${chapterId}`, HTTP_METHODS.PUT)
}