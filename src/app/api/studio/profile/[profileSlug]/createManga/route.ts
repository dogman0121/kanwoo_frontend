import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, `/manga`, {
            method: "POST",
            body: request.body,
        }
    )
}