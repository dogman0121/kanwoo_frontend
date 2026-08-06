import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"

export async function GET(request: Request, {
    params
}: {
    params: Promise<{chapterId: string}>
}) {
    const {chapterId} = await params;

    return fetchApi(request, `/chapters/${chapterId}/progress`, HTTP_METHODS.GET)
}

export async function POST(request: Request, {
    params
}: {
    params: Promise<{chapterId: string}>
}) {
    const {chapterId} = await params;

    return fetchApi(request, `/chapters/${chapterId}/progress`, HTTP_METHODS.POST)
}