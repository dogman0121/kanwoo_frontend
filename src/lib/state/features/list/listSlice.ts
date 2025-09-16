import List from "@/types/list";
import { createSlice } from "@reduxjs/toolkit";

export interface ListState {
    list: List | null | undefined,
}

const initialState: ListState = {
    list: undefined,
}

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload
        },
    }
})

export const { setList } = listSlice.actions

export default listSlice.reducer