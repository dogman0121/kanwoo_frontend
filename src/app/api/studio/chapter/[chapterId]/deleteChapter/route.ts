import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(
    request: Request,
    { params }: { params: Promise<{chapterId: string}> }
) {
    const { chapterId } = await params;
    
    return fetchApi(request, `/chapters/${chapterId}`, {method: "DELETE"})
}