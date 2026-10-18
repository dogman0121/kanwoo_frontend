import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudioManga } from "../../types/studio-manga.type";
import { Entity } from "@/lib/types/Entity.type";

const mangaAdapter = createEntityAdapter({
    selectId: (manga: Entity<StudioManga>) => manga.data.id
})

const initialState = mangaAdapter.getInitialState()

type RootState = {
    studio: {profile: {manga: typeof initialState}}
}

export const profileMangaSlice = createSlice({
    name: "studio_profile_manga",
    initialState,
    reducers: {
        setMangaList: (state, action: PayloadAction<Entity<StudioManga>[]>) => {
            mangaAdapter.setMany(state, action.payload)
        },
        addManga: (state, action: PayloadAction<Entity<StudioManga>>) => {
            mangaAdapter.addOne(state, action.payload)
        }
    }
})

export const {
    selectAll: selectManga
} = mangaAdapter.getSelectors((state: RootState) => state.studio.profile.manga)

export const { 
    setMangaList,
    addManga
} = profileMangaSlice.actions

export default profileMangaSlice.reducer