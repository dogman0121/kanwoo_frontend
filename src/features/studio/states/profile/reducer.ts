import { combineReducers } from "redux";

import pageReducer from "./page.slice"
import mangaReducer from "./manga.slice"
import translationReducer from "./translations.slice"

export const profileReducer = combineReducers({
    page: pageReducer,
    manga: mangaReducer,
    translations: translationReducer
})