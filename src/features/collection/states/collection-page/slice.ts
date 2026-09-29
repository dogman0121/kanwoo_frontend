import { Collection, CollectionContext } from "@/types/collection";
import { MangaShort } from "@/types/manga";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMangaIntoCollection, fetchCollectionManga, removeMangaFromCollection, updateCollection } from "../lib/thunks";

interface CollectionPageState {
    collection?: Collection,
    collectionContext?: CollectionContext
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
    name: "collection_page",
    initialState,
    reducers: {
        setCollection: (state, action: PayloadAction<{collection: Collection, context: CollectionContext}>) => {
            state.collection = action.payload.collection
            state.collectionContext = action.payload.context
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
            const {response: {data: collection}} = action.payload
            
            if (state.collection?.id == collection.id)
                state.collection = collection
        })
        .addCase(removeMangaFromCollection.fulfilled, (state, action) => {
            const {mangaSlug, collectionId} = action.payload;

            console.log(123, mangaSlug, collectionId)
            if (state.collection?.id != collectionId)
                return

            state.manga = state.manga.filter(m => m.slug != mangaSlug)
        })
    )
})

export const selectCollection = (state: RootState) => state.collectionPage.collection
export const selectCollectionContext = (state: RootState) => state.collectionPage.collectionContext;
export const selectCollectionManga = (state: RootState) => state.collectionPage.manga
export const selectEditDialogOpen = (state: RootState) => state.collectionPage.ui.editDialogOpen
export const selectAddMangaDialogOpen = (state: RootState) => state.collectionPage.ui.addMangaDialogOpen

export const {
    setCollection,
    setAddMangaDialogOpen,
    setEditDialogOpen,
    addManga,
    removeManga
} = collectionPageSlice.actions

export default collectionPageSlice.reducer