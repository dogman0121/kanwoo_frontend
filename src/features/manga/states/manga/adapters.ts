import { createEntityAdapter } from "@reduxjs/toolkit";
import { MangaBlock, MangaEntity } from "./state";

export const mangaAdapter = createEntityAdapter({
    selectId: (manga: MangaBlock) => manga.manga.data.slug
})

