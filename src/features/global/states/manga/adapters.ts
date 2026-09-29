import { createEntityAdapter } from "@reduxjs/toolkit";
import { MangaBlock } from "./state";

export const mangaAdapter = createEntityAdapter({
    selectId: (manga: MangaBlock) => manga.manga.slug
})

