import { combineReducers } from "redux";

import pageReducer from "./page.slice"
import translationReducer from "./translations.slice"

export const mangaReducer = combineReducers({
    page: pageReducer,
    translations: translationReducer
})