import { fetchManyApi } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,
    {params}: {params: Promise<{mangaSlug: string}>}
) {
    const {mangaSlug} = await params;

    return await fetchManyApi(
        request, 
        [
            {name: "manga", url: `/manga/${mangaSlug}`, options: { method: "GET" }},
            {name: "mangaPermission", url: `/manga/${mangaSlug}/permissions`, options: { method: "GET" }}
        ]
    )
}