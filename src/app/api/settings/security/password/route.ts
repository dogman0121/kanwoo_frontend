import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export function PUT(request: Request) {
    return fetchApi(request, "/auth/password", HTTP_METHODS.PUT)
}