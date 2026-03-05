import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, `/auth/recovery`, {method: "POST"})
}