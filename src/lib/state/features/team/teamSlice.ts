import Team from "@/types/team";
import { createSlice } from "@reduxjs/toolkit";

export interface TeamState {
    team: Team | null | undefined,
}

const initialState: TeamState = {
    team: undefined,
}

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setTeam: (state, action) => {
            state.team = action.payload
        },
    }
})

export const { setTeam } = teamSlice.actions

export default teamSlice.reducer