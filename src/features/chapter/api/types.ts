import { Chapter } from "@/types/chapter"
import { CursorPagination } from "../../../lib/fetch/api-response.types"


export type GetChapterPageResponseData = {
    chapter: Chapter,
    comments_preview: Comment[],
}

export type GetChapterPageResponseMetadata = {
    comments_preview: {
        total_count: number
    }
}

export type GetChapterPageResponsePagination = {
    comments_preview: CursorPagination
}