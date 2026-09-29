import { createSlice } from "@reduxjs/toolkit";
import { collectionsAdapter } from "./collections.adapters";
import { createCollection } from "@/features/collection/states/lib/thunks";

const initialState = collectionsAdapter.getInitialState()

export type CollectionState = typeof initialState

export const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollections: collectionsAdapter.setAll,
        updateCollection: collectionsAdapter.updateOne,
        deleteCollection: collectionsAdapter.removeOne
    },
    extraReducers: (builder) => (builder
        .addCase(createCollection.fulfilled, 
            (state, action) => {
                const { response } = action.payload

                collectionsAdapter.addOne(state, response.data)
            }
        )
    )
})

export const { 
    setCollections,
    updateCollection,
    deleteCollection
} = collectionsSlice.actions

export type RootState = {
    global: {authProfile: {collections: CollectionState}}
}


export const {
    selectAll: selectAuthProfileCollections
} = collectionsAdapter.getSelectors((state: RootState) => state.global.authProfile.collections)


export default collectionsSlice.reducer