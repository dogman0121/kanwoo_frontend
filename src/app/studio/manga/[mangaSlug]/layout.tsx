import EditLayout from "@/features/edit/components/EditLayout";
import { studioServerApi } from "@/lib/fetch/features/studio/server";
import { ApiError } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";
import StudioMangaProvider from "./_components/StudioMangaProvider";
import { Box } from "@mui/material";
import StudioMangaDrawer from "./_components/StudioMangaDrawer";
import { serverFetch } from "@/lib/fetch/serverFetch";
import { GetStudioPageManga } from "@/app/api/studio/manga/[mangaSlug]/route";

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{mangaSlug: string}>
}) {
    try {
        const {mangaSlug} = await params;

        const {data: studioMangaInfo} = await serverFetch.get<GetStudioPageManga>(`/studio/manga/${mangaSlug}`)

        if (!studioMangaInfo.manga || !studioMangaInfo.mangaPermission.edit)
            return notFound()

        return (
            <EditLayout>
                <StudioMangaProvider
                    manga={studioMangaInfo.manga}
                    mangaPermission={studioMangaInfo.mangaPermission}
                >
                    <StudioMangaDrawer />
                    <Box
                        sx={{
                            width: "100%"
                        }}
                    >
                        {children}
                    </Box>
                </StudioMangaProvider>
            </EditLayout>
        )
    } catch(e) {
        if (e instanceof ApiError){
            notFound();
        }

        throw e;
    }
}