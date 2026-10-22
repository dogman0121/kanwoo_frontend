import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, MangaEntity, MangaState } from "./state";
import { Manga, MangaContext, MangaMetadata } from "@/types/manga";
import { mangaAdapter } from "./adapters";
import { addMangaIntoCollection, removeMangaFromCollection } from "@/features/collection/states/lib/thunks";
import { mangaClientApi } from "@/lib/fetch/features/manga/client.api";


export const fetchManga = createAsyncThunk(
    "manga/fetchMangaStatus",
    async (mangaUUID: string) => {
        const response = await mangaClientApi.getManga(mangaUUID)

        return {
            response: response
        }
    }
)

export const mangaSlice = createSlice({
    name: "manga",
    initialState,
    reducers: {
        addManga: (state: MangaState, action: PayloadAction<MangaEntity>) => {
            mangaAdapter.setOne(state, {
                manga: action.payload
            })
        }
    },
    extraReducers: (builder) => ( builder
        .addCase(fetchManga.fulfilled, 
            (state, action) => {
                const {response} = action.payload

                mangaAdapter.addOne(state,
                    {
                        manga: {
                            data: response.data,
                            context: response.context
                        }
                    }
                )
            }
        )
        .addCase(addMangaIntoCollection.fulfilled, 
            (state, action) => {
                const {mangaSlug, collectionId} = action.payload

                const manga = state.entities[mangaSlug]
                if (!manga) return

                manga.manga.context!.viewer.collections.push(collectionId)
            }
        )
        .addCase(removeMangaFromCollection.fulfilled, 
            (state, action) => {
                const {mangaSlug, collectionId} = action.payload

                const manga = state.entities[mangaSlug]
                if (!manga) return

                manga.manga.context!.viewer.collections = manga.manga.context!.viewer.collections.filter(cId => cId != collectionId)
            }
        )
    )
})

export const {
    addManga
} = mangaSlice.actions

export default mangaSlice.reducer