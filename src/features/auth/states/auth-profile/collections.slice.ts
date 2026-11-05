import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collectionsAdapter } from "./collections.adapters";
import { createCollection } from "@/features/collection/states/lib/thunks";
import { profileClientApi } from "@/lib/fetch/features/profile/client.api";
import { useAppSelector } from "@/lib/state/hooks";

const initialState = collectionsAdapter.getInitialState({
    ui: {
        loaded: false
    }
})

export type CollectionState = typeof initialState & {
    ui: {
        loaded: boolean
    }
}

export const loadCollections = createAsyncThunk(
    "authProfileCollections",
    async (thunkAPI) => {
        try {
            const response = await profileClientApi.getCollections()

            return {
                response
            }
        } catch (e) {
            throw e
        }
    }
)


export const collectionsSlice = createSlice({
    name: "authProfileCollections",
    initialState,
    reducers: {
        setCollections: collectionsAdapter.setAll,
        updateCollection: collectionsAdapter.updateOne,
        deleteCollection: collectionsAdapter.removeOne
    },
    extraReducers: (builder) => (builder
        .addCase(createCollection.fulfilled, (state, action) => {
            const { response } = action.payload

            collectionsAdapter.addOne(state, {
                data: response.data,
            })
        })
        .addCase(loadCollections.fulfilled, (state, action) => {
            const {response} = action.payload
            
            collectionsAdapter.setMany(state, response.data.map((collection, idx) => ({
                data: collection,
            })))

            state.ui.loaded = true
        })
    )
})

export const { 
    setCollections,
    updateCollection,
    deleteCollection
} = collectionsSlice.actions

export type RootState = {
    auth: {authProfile: {collections: CollectionState}}
}


export const {
    selectAll: selectAuthProfileCollections
} = collectionsAdapter.getSelectors((state: RootState) => state.auth.authProfile.collections)


export const selectCollectionsLoaded = (state: RootState) => state.auth.authProfile.collections.ui.loaded

export default collectionsSlice.reducer