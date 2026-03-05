import { fetchApi } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return fetchApi(request, '/home', {method: "GET"})
}