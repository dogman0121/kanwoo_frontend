import { fetchApi } from "@/lib/api/fetchApi";

export async function GET(
    request: Request,
    { params }: { params: Promise<{profileSlug: string}> }
) {
    const {profileSlug} = await params;

    return fetchApi(request, `/profiles/${profileSlug}/translations?full=true`, {method: "GET"})
}