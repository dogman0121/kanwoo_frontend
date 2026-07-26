import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export function POST(request: Request) {
    return fetchApi(request, "/comments", HTTP_METHODS.POST)
}