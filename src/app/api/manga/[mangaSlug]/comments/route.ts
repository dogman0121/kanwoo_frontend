import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {
    params
}: {
    params: Promise<{mangaSlug: string}>
}) {
    const {mangaSlug} = await params;

    return fetchApi(
        request, 
        `/manga/${mangaSlug}/comments?${request.nextUrl.searchParams.toString()}`, 
        HTTP_METHODS.GET
    )
}