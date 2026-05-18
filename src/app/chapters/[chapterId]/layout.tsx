import { serverFetch } from "@/lib/fetch/serverFetch"
import Chapter from "@/types/chapter/chapter"
import ChapterProvider from "./_components/ChapterProvider";
import { AppBar, Container, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { chapterTheme } from "./theme";
import ReadingProgress from "@/types/manga/readingProgress";
import { GetChapterResponse } from "@/app/api/chapters/[chapterId]/route";

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{chapterId: string}>
}) {
    const { chapterId } = await params;

    const {data: chapterData} = await serverFetch.get<GetChapterResponse>(`/chapters/${chapterId}`)
    
    return (
        <> 
            <ThemeProvider
                theme={chapterTheme}
            >
                <CssBaseline />
                <ChapterProvider
                    chapter={chapterData.chapter}
                    readingProgress={chapterData.reading_progress}
                >
                    {children}
                </ChapterProvider>
            </ThemeProvider>
        </>
    )
}