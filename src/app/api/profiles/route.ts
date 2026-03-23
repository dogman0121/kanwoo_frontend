import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return await fetchApi(request, "/profiles", HTTP_METHODS.GET)
}

export async function POST(request: Request) {
    return fetchApi(request, "/profiles", HTTP_METHODS.POST)
}