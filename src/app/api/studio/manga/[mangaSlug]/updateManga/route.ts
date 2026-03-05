import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(
    request: Request,
    { params }: { params: Promise<{mangaSlug: string}> }
) {
    const {mangaSlug} = await params

    return fetchApi(request, `/manga/${mangaSlug}`, {
            method: "PUT",
            body: request.body,
        }
    )
}