import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, "/admin/profiles", HTTP_METHODS.POST)
}


export async function GET(request: Request) {
    return fetchApi(request, "/admin/profiles", HTTP_METHODS.GET)
}
