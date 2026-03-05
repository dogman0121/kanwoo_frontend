import { fetchApi } from "@/lib/api/fetchApi"

export async function POST(request: Request, {
    params
}: {
    params: Promise<{feedbackId: string}>
}) {
    const {feedbackId} = await params

    return fetchApi(request, `/admin/feedbacks/${feedbackId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: request.body
    })
}