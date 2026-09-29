import { Chapter } from "@/types/chapter"

export enum ReadingEventType {
    PAGE_CHANGED = "page_changed",
    CHAPTER_CHANGED = "chapter_changed",
    LOAD_NEXT_CHAPTER = "load_next_chapter"
}

export type ReadingEvent<T> = {
    type: ReadingEventType,
    value: T
}

export type PageChangeEvent = ReadingEvent<{
    chapterId: number,
    pageNumber: number
}>

export type NextChapterEvent = ReadingEvent<{
    chapterId: number,
    nextChapterId: number
}>

export default interface ReaderVariant {
    onPageChange?: (event: PageChangeEvent) => void
    onLoadNextChapter?: (event: NextChapterEvent) => void
}