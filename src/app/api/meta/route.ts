import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return await fetchApi(request, "/meta", HTTP_METHODS.GET)
}