import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return fetchManyApi(request, [
        {url:"/profiles/current", name: "profile", method: HTTP_METHODS.GET},
        {url:"/collections", name: "collections", method: HTTP_METHODS.GET}
    ])
}

export async function PUT(request: Request) {
    return fetchApi(request, "/profiles/current", HTTP_METHODS.PUT)
}