import { Entity } from "@/lib/types/Entity.type";
import { chaptersAdapter } from "./adapters";
import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter";

export type ChapterEntity = Entity<Chapter, ChapterContext>

export interface KanwooReaderStateWithoutAdapter {
    currPageNumber: number,
    currChapterInd: number,
    initialized: boolean
}

export const initialStateWithoutAdapter: KanwooReaderStateWithoutAdapter = {
    currPageNumber: 0,
    currChapterInd: 0,
    initialized: false
}

export const initialState = chaptersAdapter.getInitialState(initialStateWithoutAdapter)

export type KanwooReaderState = typeof initialState

export type RootState = {
    reader: {reader: KanwooReaderState}
}