import { fetchApi } from "@/lib/api/fetchApi";
import MainDashboard from "@/types/admin/dashboards/mainDashboard";

export type GetAdminMainDashboard = MainDashboard

export async function GET(request: Request) {
    return fetchApi(request, `/admin/dashboards/main`, {method: "GET"})
}