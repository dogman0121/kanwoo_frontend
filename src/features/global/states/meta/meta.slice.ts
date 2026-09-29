import Meta from "@/types/meta";
import { createSlice } from "@reduxjs/toolkit";

export interface MetaState {
    meta: Meta | undefined,
}

const initialState: MetaState = {
    meta: undefined
}

type RootState = {
    global: {meta: MetaState}
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

export const selectMeta = (state: RootState) => state.global.meta.meta

export default metaSlice.reducer