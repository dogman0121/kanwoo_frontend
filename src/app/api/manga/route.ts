import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, `/manga`, HTTP_METHODS.POST)
}
