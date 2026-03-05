import { fetchApi } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const params = request.nextUrl.searchParams
    
    return fetchApi(request, `/search?${params.toString()}`)
}