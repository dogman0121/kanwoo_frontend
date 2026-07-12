import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export function POST(request: Request) {
    return fetchApi(request, "/auth/oauth/yandex", HTTP_METHODS.POST)
}