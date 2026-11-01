import { createEntityAdapter } from "@reduxjs/toolkit";
import { ChapterEntity } from "./state";

export const chaptersAdapter = createEntityAdapter({
    selectId: (chapter: ChapterEntity) => chapter.data.id,
    sortComparer: (a, b) => (a.data.chapter - b.data.chapter)
})