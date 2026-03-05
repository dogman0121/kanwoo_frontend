import { fetchManyApi } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{profileSlug: string}>}
) {
    const {profileSlug} = await params;

    return fetchManyApi(
        request,
        [
            { name: "profile", url:`/profiles/${profileSlug}`, options: { method: "GET" } },
            { name: "profilePermission", url:`/profiles/${profileSlug}/permissions`, options: { method: "GET" } }
        ]
    )
}