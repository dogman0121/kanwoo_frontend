import { createSelector } from "@reduxjs/toolkit";
import { mangaAdapter } from "./adapters";
import { MangaBlock, RootState } from "./state";
import { Manga } from "@/types/manga";

export const {
    selectById: selectMangaBlockById
} = mangaAdapter.getSelectors((state: RootState) => state.manga)


export const selectMangaById = (state: RootState, id: number) => {
    const mangaBlock = selectMangaBlockById(state, id)

    if (mangaBlock)
        return mangaBlock.manga

    return null
}

export const selectMangaBySlug = (state: RootState, slug: string) => {
    for (let blockId of state.manga.ids) {
        if (state.manga.entities[blockId].manga.data.slug == slug)
            return state.manga.entities[blockId].manga
    }

    return null
}

export const selectMangaInCollection = createSelector(
    [
        (state: RootState, mangaId: number, collectionId: number) => {
            return {
                manga: selectMangaBlockById(state, mangaId),
                collectionId: collectionId
            }
        },
    ],
    (data: {manga: MangaBlock, collectionId: number}) => {
        const {manga, collectionId} = data

        return manga.manga.context!.viewer.collections.findIndex(cId => cId == collectionId) != -1
    }
)