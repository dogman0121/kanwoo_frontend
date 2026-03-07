import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"

export async function POST(request: Request, {
    params
}: {
    params: Promise<{feedbackId: string}>
}) {
    const {feedbackId} = await params

    return fetchApi(request, `/admin/feedbacks/${feedbackId}`, HTTP_METHODS.DELETE)
}