import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, `/auth/register`, HTTP_METHODS.POST)
}