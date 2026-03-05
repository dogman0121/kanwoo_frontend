import { fetchApi } from "@/lib/api/fetchApi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return fetchApi(request, "/admin/chapters/reports", {method: "GET"})
}