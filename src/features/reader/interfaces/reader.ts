import { Chapter } from "@/types/chapter"
import Page from "@/types/chapter/page"

export enum ReadingEventType {
    PAGE_CHANGED = "page_changed",
    CHAPTER_READING_FINISHED = "chapter_reading_finished",
    CHAPTER_CHANGED = "chapter_changed",
    LOAD_NEXT_CHAPTER = "load_next_chapter"
}

export type ReadingEvent<T> = {
    value: T
}

export type PageChangedEvent = ReadingEvent<{
    chapter: Chapter,
    chapterIdx: number,
    page: Page,
    pageNumber: number
}>

export type ChapterReadingFinishedEvent = ReadingEvent<{
    chapter: Chapter
}>

export type LoadNextChapterEvent = ReadingEvent<{
    chapter: Chapter
}>

export default interface ReaderVariant {
    onPageChanged?: (event: PageChangedEvent) => void
    onLoadNextChapter?: (event: LoadNextChapterEvent) => void
    onChapterReadingFinished?: (event: ChapterReadingFinishedEvent) => void
}