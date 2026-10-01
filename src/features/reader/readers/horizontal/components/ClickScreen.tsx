"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { Box } from "@mui/material"
import useWindowHeight from "@/features/reader/hooks/useWindowHeight";
import useClickController from "@/features/reader/readers/horizontal/hooks/controllers/useClickController";
import { selectCurrentChapter, selectCurrentPage } from "@/features/reader/states/reader/selectors";
import { selectEndOfChapterReached } from "@/features/reader/states/reader.slice";
import ReaderPage from "../../../components/ReaderPage";
import ReaderVariant from "@/features/reader/interfaces/reader";
import OffsetContainer from "@/features/reader/components/ui/OffsetContainer";
import ChapterFooterInner from "@/features/reader/components/ChapterFooterInner";
import { Chapter } from "@/types/chapter";
import { NavigationButtonsShadow } from "@/features/reader/components/NavigationButtons";
import ChapterFooter from "./ChapterFooter";

export interface ClickScreenProps extends ReaderVariant {

}

export default function ClickScreen({
    onPageChange,
    onLoadNextChapter
}: ReaderVariant) {

    const { height } = useWindowHeight();

    const {playgroundRef} = useClickController({
        onPageChange: onPageChange,
        onLoadNextChapter: onLoadNextChapter
    })

    const currentPage = useAppSelector(selectCurrentPage)
    const currChapter = useAppSelector(selectCurrentChapter)

    const endReached = useAppSelector(selectEndOfChapterReached)

    return (
        <Box
            sx={{
                height: height + "px" ,

                display: "flex",
            }}
        >
            {currChapter && currentPage && (
                <>
                    {endReached && (
                        <ChapterFooter chapter={currChapter} ref={playgroundRef}/>
                    )}
                    {!endReached && (
                        <OffsetContainer 
                            sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                            ref={playgroundRef}
                        >
                            <ReaderPage 
                                page={currentPage}
                                sx={{
                                    margin: "0 auto",
                                    
                                    display: "block",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                }}
                            />
                        </OffsetContainer>
                    )}
                </>
            )}
            
        </Box>
    )
}