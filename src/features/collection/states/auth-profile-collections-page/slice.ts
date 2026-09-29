import { collectionClientApi } from "@/features/collection/api/client.api";
import { Collection } from "@/types/collection";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createCollection, fetchCollections } from "../lib/thunks";


const collectionsAdapter = createEntityAdapter({
    selectId: (collection: Collection) => collection.id
})

const initialState = collectionsAdapter.getInitialState()

export type AuthProfileCollectionsPageState = typeof initialState


type RootState = {
    authProfileCollectionsPage: AuthProfileCollectionsPageState
}


const authProfileCollectionsPage = createSlice({
    name: "auth_profile_collections_page",
    initialState,
    reducers: {
        updateCollection: collectionsAdapter.updateOne
    },
    extraReducers: (builder) => (builder
        .addCase(fetchCollections.fulfilled, (state, action) => {
            const {response} = action.payload

            collectionsAdapter.setAll(state, response.data)
        })
        .addCase(createCollection.fulfilled, (state, action) => {
            const {response} = action.payload

            collectionsAdapter.addOne(state, response.data)
        })
    )
})

export const {
    updateCollection
} = authProfileCollectionsPage.actions;

export const {
    selectAll: selectCollections
} = collectionsAdapter.getSelectors((state: RootState) => state.authProfileCollectionsPage)

export default authProfileCollectionsPage.reducer;