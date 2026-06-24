import { fetchApi, fetchManyApi, HTTP_METHODS } from "@/lib/api/fetchApi";

export async function GET(request: Request) {
    return fetchManyApi(request, [
        {name: "progress", url: "/progresses", method: HTTP_METHODS.GET},
        {name: "hero", url: "/home/hero", method: HTTP_METHODS.GET},
        {name: "ended", url: "/home/ended", method: HTTP_METHODS.GET},
        {name: "newest", url: "/home/newest", method: HTTP_METHODS.GET},
        {name: "most_viewed", url: "/home/most-viewed", method: HTTP_METHODS.GET},
    ])
}