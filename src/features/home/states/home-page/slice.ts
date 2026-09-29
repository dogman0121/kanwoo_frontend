import { createSlice } from "@reduxjs/toolkit";
import { Hero } from "../../types";
import { MangaShort } from "@/types/manga";

export interface HomePageState {
    hero: Hero[],
    newest: MangaShort[],
    mostViewed: MangaShort[],
    ended: MangaShort[],
}

const initialState: HomePageState = {
    hero: [],
    newest: [],
    mostViewed: [],
    ended: []
}

type RootState = {
    homePage: {page: HomePageState}
}

export const homePageSlice = createSlice({
    name: "home_page",
    initialState,
    reducers: {
        setHero: (state, action) => {
            state.hero = action.payload
        },
        setNewest: (state, action) => {
            state.newest = action.payload
        },
        setMostViewed: (state, action) => {
            state.mostViewed = action.payload
        },
        setEnded: (state, action) => {
            state.ended = action.payload
        },
    }
})

export const selectHero = (state: RootState) => state.homePage.page.hero
export const selectNewest = (state: RootState) => state.homePage.page.newest
export const selectMostViewed = (state: RootState) => state.homePage.page.mostViewed
export const selectEnded = (state: RootState) => state.homePage.page.ended

export const {
    setHero,
    setNewest,
    setMostViewed,
    setEnded
} = homePageSlice.actions

export default homePageSlice.reducer