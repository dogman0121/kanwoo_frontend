import { fetchApi } from "@/lib/api/fetchApi"

export async function POST(request: Request) {
    const apiResponse = await fetchApi(request, "/auth/refresh", {
        method: "POST",
        cache: "no-cache"
    })

    return apiResponse
}