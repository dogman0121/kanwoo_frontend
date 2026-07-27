import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, "/translations", HTTP_METHODS.POST)
}

export async function PUT(request: Request) {
    return fetchApi(request, "/translations", HTTP_METHODS.PUT)
}