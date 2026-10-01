import { Chapter, ChapterContext } from "@/types/chapter";
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import PageLoader from "./pageLoader";
import ProgressSaver from "./progressSaver";
import { readerClientAPI } from "../api/client.api";

export interface ReaderProps {
  pageLoader: PageLoader;
  progressSaver: ProgressSaver;
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
        // readingProgress: ReadingProgress
        // readingProgressContext: ReadingProgressContext
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
    pageLoader?: PageLoader
    progressSaver?: ProgressSaver
    currPageNumber?: number
    currChapterID?: number

    // Внутри храним как any — снаружи всё типизировано
    private eventsHandlers: Map<
        ReaderEventsType,
        Set<(event: any) => void>
    > = new Map();

    constructor({ pageLoader, progressSaver }: ReaderProps) {
        this.pageLoader = pageLoader;
        this.progressSaver = progressSaver;
    }

    async _fetchChapter(chapterID: number) {
        const response = await readerClientAPI.getChapter(chapterID);
        return {
            chapter: response.data,
            chapterMetadata: response.metadata,
            chapterContext: response.context,
        };
    }

    async _fetchChapterProgress(chapterID: number) {
        const response = await readerClientAPI.getChapterProgress(chapterID);
        return {
            progress: response.data,
            progressMetadata: response.metadata,
            progressContext: response.context,
        };
    }

    async initialize(chapterID: number) {
        console.log("initialize")
        const [chapterResponse] = await Promise.all([
            this._fetchChapter(chapterID),
            // this._fetchChapterProgress(chapterID),
        ]);

        this.currChapterID = chapterID
        this.currPageNumber = 0

        this.pageLoader?.init(
            chapterResponse.chapter.id,
            chapterResponse.chapter.pages!,
            0
        );

        // TS проверит, что value соответствует ReaderEventsType.INITIALIZED
        this.dispatchEvent(ReaderEventsType.INITIALIZED, {
            chapter: chapterResponse.chapter,
            chapterContext: chapterResponse.chapterContext,
        });
    }

    setChapter(chapterId: number) {
        this.pageLoader?.setChapter(chapterId)
    }

    setPageNumber(pageNumber: number) {
        this.pageLoader?.setPageNumber(pageNumber)
    }

    async loadChapter(chapterID: number) {
        const chapterData = await this._fetchChapter(chapterID)

        this.pageLoader?.addChapter(chapterData.chapter.id, chapterData.chapter.pages!)

        this.dispatchEvent(ReaderEventsType.CHAPTER_LOADED, chapterData)
    }

    getPageLoader() {
        return this.pageLoader;
    }

    getProgressSaver() {
        return this.progressSaver;
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