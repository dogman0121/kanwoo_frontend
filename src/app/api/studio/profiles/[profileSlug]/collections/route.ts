import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{profileSlug: string}>}
) {

    const { profileSlug } = await params;

    return fetchApi(request, `/profiles/${profileSlug}/collections?` + request.nextUrl.searchParams.toString(), HTTP_METHODS.GET)
}