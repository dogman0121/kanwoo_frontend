import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {
    params
}: {
    params: Promise<{chapterId: string}>
}) {
    const {chapterId} = await params;

    return fetchApi(
        request, 
        `/chapters/${chapterId}/comments?${request.nextUrl.searchParams.toString()}`, 
        HTTP_METHODS.GET
    )
}