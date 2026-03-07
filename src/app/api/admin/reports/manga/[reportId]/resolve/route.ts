import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return fetchApi(request, "/admin/manga/reports", HTTP_METHODS.GET)
}

export async function POST(
    request: Request, 
    {
        params
    }: {
        params: Promise<{reportId: string}>
    }) {

    const {reportId} = await params

    return fetchApi(request, `/admin/manga/reports/${reportId}`, HTTP_METHODS.POST)
}