import { createEntityAdapter } from "@reduxjs/toolkit";
import { ChapterBlock } from "./state";

export const chaptersAdapter = createEntityAdapter({
    selectId: (chapter: ChapterBlock) => chapter.chapter.id,
    sortComparer: (a, b) => (a.chapter.chapter - b.chapter.chapter)
})