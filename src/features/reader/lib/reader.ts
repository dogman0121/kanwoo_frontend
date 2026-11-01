import { Chapter, ChapterContext } from "@/types/chapter";
import PageLoader from "./page-loader";
import { readerClientAPI } from "../api/client.api";
import ProgressController from "./progress-controller";
import { ReaderMode } from "@/features/types/reader-mode";
import { ApiError } from "@/lib/fetch/api-response.types";
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import { Alignment } from "../types/alignment.type";
import { Entity } from "@/lib/types/Entity.type";
import { ReadingModeEnum } from "@/features/translations/entities/reading-mode.enum";

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
        chapter: Entity<Chapter, ChapterContext>,
        progress: Entity<ReadingProgress, ReadingProgressContext> | null
    }
    [ReaderEventsType.CHAPTER_LOADED]: Entity<Chapter, ChapterContext>
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

    defaultReadingMode?: ReadingModeEnum
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
                data: response.data,
                metadata: response.metadata,
                context: response.context,
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
        const chapter = await this._fetchChapter(chapterID)
        const progress = await this.progressController.initialize({
            mode: mode,
            chapterID: chapter.data.id,
        })

        this.pageLoader.initialize({
            mode: mode,
            chapterID: chapter.data.id,
            pages: chapter.data.pages!,
        })

        this.pageLoader.setPage(chapter.data.id, progress?.data!.page || 0)
        this.defaultReadingMode = chapter.context.translation.default_reading_mode.id

        // TS проверит, что value соответствует ReaderEventsType.INITIALIZED
        this.dispatchEvent(ReaderEventsType.INITIALIZED, {
            chapter: chapter,
            progress: progress,
        });
    }

    setPage(chapterID: number, pageNumber: number) {
        this.pageLoader.setPage(chapterID, pageNumber)
        this.progressController.setPage(chapterID, pageNumber)
    }

    async loadChapter(chapterID: number) {
        const chapter = await this._fetchChapter(chapterID)

        this.pageLoader?.addChapter(chapter.data.id, chapter.data.pages!)

        this.dispatchEvent(ReaderEventsType.CHAPTER_LOADED, chapter)
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

    getReadingMode() {
        return this.defaultReadingMode || ReadingModeEnum.VERTICAL
    }
}

export default Reader;