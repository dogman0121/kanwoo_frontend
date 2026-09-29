import Page from "@/types/chapter/page";
import { Chapter } from "@/types/chapter";

export type GetPageReturnType = {
    idx: number | null,
    page: Page | null,
    isChapterChanged: boolean
}

export function getNextPage(
    chapters: Chapter[], 
    currChapterInd: number, 
    currPageNumber: number
): GetPageReturnType {
    const isLastPage = currPageNumber == chapters[currChapterInd].pages!.length-1
    const hasNextChapter = currChapterInd < chapters.length -1
    if (isLastPage) {
        if (hasNextChapter){ 
            const nextChapterInd = currChapterInd + 1
            const nextPageNumber = 0

            return {
                idx: nextPageNumber,
                page: chapters[nextChapterInd].pages![nextPageNumber],
                isChapterChanged: true
            }
        } else {
            return {
                idx: null,
                page: null,
                isChapterChanged: false
            }
        }

    } else {
        const nextPageInd = currChapterInd + 1
        return {
            idx: currPageNumber+1,
            page: chapters[currChapterInd].pages![nextPageInd],
            isChapterChanged: false
        }
    }
}

export function getPrevPage(
    chapters: Chapter[], 
    currChapterInd: number, 
    currPageNumber: number
): GetPageReturnType {
    const isFirstPage = currPageNumber == 0
    const hasPrevChapter = currChapterInd > 0
    if (isFirstPage) {
        if (hasPrevChapter){
            const prevChapter = currChapterInd - 1
            const prevChapterPages = chapters[prevChapter].pages!
            const prevPageNumber = prevChapterPages.length - 1
            

            return {
                idx: prevPageNumber,
                page: prevChapterPages[prevPageNumber],
                isChapterChanged: true
            }
        } else {
            return {
                idx: null,
                page: null,
                isChapterChanged: false
            }
        }
    } else {
        const prevPageNumber = currPageNumber - 1
        return {
            idx: prevPageNumber,
            page: chapters[currChapterInd].pages![prevPageNumber],
            isChapterChanged: false
        }
    }
}

export const findChapterIndexOrError = (chapterId: number, ids: number[]) => {
    const idx = ids.findIndex(cid => cid == chapterId)

    if (idx == -1) throw new Error("Failed to find chapter")

    return idx
}