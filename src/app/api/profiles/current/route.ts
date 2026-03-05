import { fetchApi } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return await fetchApi(request, "/profiles/current", {
        method: "GET"
    })
}