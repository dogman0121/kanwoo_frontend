import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi"

export async function POST(request: Request) {
    const apiResponse = await fetchApi(request, "/auth/refresh", HTTP_METHODS.POST)

    return apiResponse
}