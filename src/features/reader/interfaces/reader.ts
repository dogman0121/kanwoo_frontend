import { Chapter } from "@/types/chapter"
import Page from "@/types/chapter/page"

export enum ReadingEventType {
    PAGE_CHANGED = "page_changed",
    CHAPTER_CHANGED = "chapter_changed",
    LOAD_NEXT_CHAPTER = "load_next_chapter"
}

export type ReadingEvent<T> = {
    type: ReadingEventType,
    value: T
}

export type PageChangedEvent = ReadingEvent<{
    chapter: Chapter,
    chapterId: number,
    chapterIdx: number,
    page: Page,
    pageNumber: number
}>

export type NextChapterEvent = ReadingEvent<{
    chapter: Chapter
}>

export default interface ReaderVariant {
    onPageChange?: (event: PageChangedEvent) => void
    onLoadNextChapter?: (event: NextChapterEvent) => void
}