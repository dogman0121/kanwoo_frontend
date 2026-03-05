import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, "/admin/manga", {
        method: "POST",
        body: request.body
    })
}