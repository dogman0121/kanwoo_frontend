import { Chapter, ChapterContext } from "@/types/chapter";
import PageLoader from "./page-loader";
import { readerClientAPI } from "../api/client.api";
import ProgressController from "./progress-controller";
import { ReaderMode } from "@/features/types/reader-mode";
import { ApiError } from "@/lib/fetch/api-response.types";
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";

export interface ReaderProps {
  pageLoader: PageLoader;
  progressController: ProgressController;
}

export enum ReaderEventsType {
  CHAPTER_LOADED = "chapterLoaded",
  INITIALIZED = "initialized",
}

// 1. Payload каждой события — без обёртки { type, value }
export type ReaderEventPayloads = {
    [ReaderEventsType.INITIALIZED]: {
        chapter: Chapter
        chapterContext: ChapterContext
        readingProgress: ReadingProgress | null
        readingProgressContext: ReadingProgressContext | null
    }
    [ReaderEventsType.CHAPTER_LOADED]: {
        chapter: Chapter,
        chapterContext: ChapterContext,
    } // пустой объект
};

// 2. Итоговый event-объект (то, что прилетает в handler)
export type ReaderEvent<K extends ReaderEventsType = ReaderEventsType> = {
    type: K
    value: ReaderEventPayloads[K]
};

// 3. Хелпер для handler'а
export type ReaderEventHandler<K extends ReaderEventsType> = (
    event: ReaderEvent<K>
) => void;

// (сохраняем старые экспорты, если они где-то используются)
export type InitilizedEvent = ReaderEvent<ReaderEventsType.INITIALIZED>
export type ChapterLoadedEvent = ReaderEvent<ReaderEventsType.CHAPTER_LOADED>

class Reader {
    pageLoader: PageLoader
    progressController: ProgressController

    currPageNumber?: number
    currChapterID?: number

    // Внутри храним как any — снаружи всё типизировано
    private eventsHandlers: Map<
        ReaderEventsType,
        Set<(event: any) => void>
    > = new Map();

    constructor({ pageLoader, progressController }: ReaderProps) {
        this.pageLoader = pageLoader;
        this.progressController = progressController;
    }

    async _fetchChapter(chapterID: number) {
        try{
            const response = await readerClientAPI.getChapter(chapterID);

            return {
                chapter: response.data,
                chapterMetadata: response.metadata,
                chapterContext: response.context,
            };
        } catch (e) {
            if (e instanceof ApiError)
                throw new Error("Failed to fetch chapter")

            throw e
        }
    }

    async initialize({
        chapterID,
        mode
    }: {
        chapterID: number,
        mode: ReaderMode
    }) {
        const {chapter, chapterContext} = await this._fetchChapter(chapterID)

        const {progress, progressContext} = await this.progressController.initialize({
            mode: mode,
            chapterID: chapter.id,
        })

        this.pageLoader.initialize({
            mode: mode,
            chapterID: chapter.id,
            pages: chapter.pages!,
        })

        this.pageLoader.setPage(chapter.id, progress?.page || 0)

        // TS проверит, что value соответствует ReaderEventsType.INITIALIZED
        this.dispatchEvent(ReaderEventsType.INITIALIZED, {
            chapter: chapter,
            chapterContext: chapterContext,
            readingProgress: progress,
            readingProgressContext: progressContext
        });
    }

    setPage(chapterID: number, pageNumber: number) {
        this.pageLoader.setPage(chapterID, pageNumber)
        this.progressController.setPage(chapterID, pageNumber)
    }

    async loadChapter(chapterID: number) {
        const chapterData = await this._fetchChapter(chapterID)

        this.pageLoader?.addChapter(chapterData.chapter.id, chapterData.chapter.pages!)

        this.dispatchEvent(ReaderEventsType.CHAPTER_LOADED, chapterData)
    }

    getPageLoader() {
        return this.pageLoader;
    }

    getProgressController() {
        return this.progressController;
    }

    dispatchEvent<K extends ReaderEventsType>(
        type: K,
        value: ReaderEventPayloads[K]
    ) {
        const event: ReaderEvent<K> = { type, value };
        const handlers = this.eventsHandlers.get(type);

        if (!handlers) return;
        for (const handler of handlers) handler(event);
    }

    addEventListener<K extends ReaderEventsType>(
        type: K,
        handlerFn: ReaderEventHandler<K>
    ) {
        let handlers = this.eventsHandlers.get(type);
        if (!handlers) {
            handlers = new Set();
            this.eventsHandlers.set(type, handlers);
        }
        handlers.add(handlerFn as (event: any) => void);
    }

    removeEventListener<K extends ReaderEventsType>(
        type: K,
        handlerFn: ReaderEventHandler<K>
    ) {
        this.eventsHandlers.get(type)?.delete(handlerFn as (event: any) => void);
    }

    destroy() {
        this.pageLoader?.destroy();
        this.eventsHandlers.clear();
    }
}

export default Reader;