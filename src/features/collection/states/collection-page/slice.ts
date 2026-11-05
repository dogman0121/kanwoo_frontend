import { Collection, CollectionContext } from "@/types/collection";
import { MangaShort } from "@/types/manga";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMangaIntoCollection, fetchCollectionManga, removeMangaFromCollection, saveCollection, unsaveCollection, updateCollection } from "../lib/thunks";
import { Entity } from "@/lib/types/Entity.type";

export type CollectionEntity = Entity<Collection, CollectionContext>

interface CollectionPageState {
    collection?: CollectionEntity,
    manga: MangaShort[],
    ui: {
        addMangaDialogOpen: boolean,
        editDialogOpen: boolean,
    }
}

const initialState: CollectionPageState = {
    manga: [],
    ui: {
        addMangaDialogOpen: false,
        editDialogOpen: false
    }
}

type RootState = {
    collectionPage: CollectionPageState
}



const collectionPageSlice = createSlice({
    name: "collectionPage",
    initialState,
    reducers: {
        initializeCollectionPage: (state, action: PayloadAction<CollectionEntity>) => {
            state.collection = action.payload
            state.manga = []
            state.ui.addMangaDialogOpen = false
            state.ui.editDialogOpen = false
        },
        setCollection: (state, action: PayloadAction<CollectionEntity>) => {
            state.collection = action.payload
        },
        setEditDialogOpen: (state, action) => {
            state.ui.editDialogOpen = action.payload
        },
        setAddMangaDialogOpen: (state, action) => {
            state.ui.addMangaDialogOpen = action.payload
        },
        removeManga: (state, action: PayloadAction<string>) => {
            state.manga = state.manga.filter(m => m.slug != action.payload)
        },
        addManga: (state, action: PayloadAction<MangaShort>) => {
            state.manga.unshift(action.payload)
        }
    },
    extraReducers: (builder) => (builder
        .addCase(fetchCollectionManga.fulfilled, (state, action) => {
            const {response} = action.payload

            state.manga = response.data
        })
        .addCase(updateCollection.fulfilled, (state, action) => {
            const { response } = action.payload
            
            if (state.collection?.data.id == response.data.id)
                state.collection = {
                    data: response.data,
                    context: state.collection.context
                }
        })
        .addCase(saveCollection.fulfilled, (state, action) => {
            if (!state.collection || !state.collection.context)
                return

            state.collection.context.viewer.is_saved = true
        })
        .addCase(unsaveCollection.fulfilled, (state, action) => {
            if (!state.collection || !state.collection.context)
                return

            state.collection.context.viewer.is_saved = false
        })
    )
})

export const selectCollection = (state: RootState) => state.collectionPage.collection
export const selectCollectionManga = (state: RootState) => state.collectionPage.manga
export const selectEditDialogOpen = (state: RootState) => state.collectionPage.ui.editDialogOpen
export const selectAddMangaDialogOpen = (state: RootState) => state.collectionPage.ui.addMangaDialogOpen

export const {
    initializeCollectionPage,
    setCollection,
    setAddMangaDialogOpen,
    setEditDialogOpen,
    addManga,
    removeManga
} = collectionPageSlice.actions

export default collectionPageSlice.reducer