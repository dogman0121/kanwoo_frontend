import { fetchApi, HTTP_METHODS } from "@/lib/api/fetchApi";
import MainDashboard from "@/types/admin/dashboards/mainDashboard";

export type GetAdminMainDashboard = MainDashboard

export async function GET(request: Request) {
    return fetchApi(request, `/admin/dashboards/main`, HTTP_METHODS.GET)
}