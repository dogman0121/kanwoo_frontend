import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, MangaState } from "./state";
import { Manga, MangaContext, MangaMetadata } from "@/types/manga";
import { mangaAdapter } from "./adapters";
import { addMangaIntoCollection, removeMangaFromCollection } from "@/features/collection/states/lib/thunks";


export const mangaSlice = createSlice({
    name: "manga",
    initialState,
    reducers: {
        addManga: (state: MangaState, action: PayloadAction<{manga: Manga, metadata: MangaMetadata, context: MangaContext}>) => {
            const { manga, metadata, context } = action.payload

            mangaAdapter.setOne(state, {
                manga: manga,
                metadata: metadata,
                context: context
            })
        }
    },
    extraReducers: (builder) => ( builder
        .addCase(addMangaIntoCollection.fulfilled, 
            (state, action) => {
                const {mangaSlug, collectionId} = action.payload

                const manga = state.entities[mangaSlug]
                if (!manga) return

                manga.context.viewer.collections.push(collectionId)
            }
        )
        .addCase(removeMangaFromCollection.fulfilled, 
            (state, action) => {
                const {mangaSlug, collectionId} = action.payload

                const manga = state.entities[mangaSlug]
                if (!manga) return

                manga.context.viewer.collections = manga.context.viewer.collections.filter(cId => cId != collectionId)
            }
        )
    )
})

export const {
    addManga
} = mangaSlice.actions

export default mangaSlice.reducer