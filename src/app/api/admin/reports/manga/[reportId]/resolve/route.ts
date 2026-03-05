import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(
    request: Request, 
    {
        params
    }: {
        params: Promise<{reportId: string}>
    }) {

    const {reportId} = await params

    return fetchApi(request, `/admin/manga/reports/${reportId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: request.body
    })
}