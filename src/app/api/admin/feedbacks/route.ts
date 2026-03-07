import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return fetchApi(request, "/admin/feedbacks?" + request.nextUrl.searchParams.toString(), HTTP_METHODS.GET)
}