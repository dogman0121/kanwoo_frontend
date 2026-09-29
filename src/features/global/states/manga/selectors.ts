import { createSelector } from "@reduxjs/toolkit";
import { mangaAdapter } from "./adapters";
import { MangaBlock, RootState } from "./state";
import { Manga } from "@/types/manga";

export const {
    selectById: selectMangaBlockBySlug
} = mangaAdapter.getSelectors((state: RootState) => state.global.manga)


export const selectMangaBySlug = (state: RootState, slug: string) => {
    const mangaBlock = selectMangaBlockBySlug(state, slug)

    if (mangaBlock)
        return mangaBlock.manga

    return null
}

export const selectMangaInCollection = createSelector(
    [
        (state: RootState, mangaSlug: string, collectionId: number) => {
            return {
                manga: selectMangaBlockBySlug(state, mangaSlug),
                collectionId: collectionId
            }
        },
    ],
    (data: {manga: MangaBlock, collectionId: number}) => {
        const {manga, collectionId} = data

        return manga.mangaContext.viewer.collections.findIndex(cId => cId == collectionId) != -1
    }
)