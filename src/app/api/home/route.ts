import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return fetchApi(request, '/home', HTTP_METHODS.GET)
}