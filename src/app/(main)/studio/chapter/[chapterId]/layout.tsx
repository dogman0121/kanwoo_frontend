import { clientFetch } from "@/lib/fetch/clientFetch"
import { serverFetch } from "@/lib/fetch/serverFetch";
import Chapter from "@/types/chapter/chapter";
import ChapterPermission from "@/types/chapter/chapterPermission";
import Translation from "@/types/translation/translation";
import TranslationPermission from "@/types/translation/translationPermission";
import StudioChapterProvider from "./_components/StudioChapterProvider";
import StudioChapterDrawer from "./_components/StudioChapterDrawer";
import { Box } from "@mui/material";
import EditLayout from "@/features/edit/components/EditLayout";

interface ChapterInfo {
    chapter: Chapter,
    chapterPermission: ChapterPermission
}

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{chapterId: string}>
}) {
    const { chapterId } = await params;

    const { data: chapterData } = await serverFetch.get<ChapterInfo>(`/studio/chapter/${chapterId}/getChapter`)
    
    return (
        <EditLayout>
            <StudioChapterProvider
                chapter={chapterData.chapter}
                chapterPermission={chapterData.chapterPermission}
            >
                <StudioChapterDrawer />
                <Box
                    sx={{
                        width: "100%"    
                    }}
                >
                    {children}
                </Box>
            </StudioChapterProvider>
        </EditLayout>
    )
}