import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
) {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    return await fetchApi(request, `/profiles/check_slug?slug=${slug}`, HTTP_METHODS.GET)
}