import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, "/manga/suggestions", {
        method: "POST",
        body: request.body,
        headers: {
            "Content-Type": "application/json"
        }
    })
}