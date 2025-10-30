import Manga from "@/types/manga";
import Meta from "@/types/meta";
import { createSlice } from "@reduxjs/toolkit";

export interface MetaState {
    meta: Meta | undefined,
}

const initialState: MetaState = {
    meta: undefined
}

export const metaSlice = createSlice({
    name: "meta",
    initialState,
    reducers: {
        setMeta: (state, action) => {
            state.meta = action.payload
        },
    }
})

export const { setMeta } = metaSlice.actions

export default metaSlice.reducer