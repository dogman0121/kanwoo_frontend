import { fetchApi, fetchManyApi } from "@/lib/api/fetchApi";

export async function GET(request: Request, {
    params
}: {
    params: Promise<{chapterId: string}>
}) {
    const { chapterId } = await params;

    return fetchManyApi(request, [
        {name: "chapter", url: `/chapters/${chapterId}`, options: {method: "GET"}},
        {name: "chapterPermissions", url: `/chapters/${chapterId}/permissions`, options: {method: "GET"}}
    ])
}