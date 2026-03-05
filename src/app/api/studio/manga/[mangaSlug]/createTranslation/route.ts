import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const {mangaSlug} = await params;

    return await fetchApi(request, `/manga/${mangaSlug}/translations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: request.body,
    })
}