import { fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,
    {params}: {params: Promise<{mangaSlug: string}>}
) {
    const {mangaSlug} = await params;

    return await fetchManyApi(
        request, 
        [
            {name: "manga", url: `/manga/${mangaSlug}`, method: HTTP_METHODS.GET},
            {name: "mangaPermission", url: `/manga/${mangaSlug}/permissions`, method: HTTP_METHODS.GET},
            {name: "readingProgress", url: `/manga/${mangaSlug}/progress`, method: HTTP_METHODS.GET}
        ]
    )
}