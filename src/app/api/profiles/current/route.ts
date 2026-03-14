import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return fetchApi(request, "/profiles/current", HTTP_METHODS.GET)
}

export async function PUT(request: Request) {
    return fetchApi(request, "/profiles/current", HTTP_METHODS.PUT)
}