import { fetchApi } from "@/lib/api/fetchApi"

export async function POST(request: Request, {
    params
}: {
    params: Promise<{mangaSlug: string}>
}) {
    const { mangaSlug } = await params;

    return await fetchApi(request, `/admin/manga/${mangaSlug}/moderation`, { 
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: request.body
    })
}