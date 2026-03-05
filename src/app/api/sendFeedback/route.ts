import { fetchApi } from "@/lib/api/fetchApi";

export async function POST(request: Request) {
    return fetchApi(request, "/feedbacks", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}