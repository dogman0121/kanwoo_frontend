import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export function GET(request: Request) {
    return fetchApi(request, "/settings/security", HTTP_METHODS.GET)
}