import { combineReducers } from "redux";

import pageReducer from "./page.slice"
import chaptersReducer from "./chapters.slice"

export const translationReducer = combineReducers({
    page: pageReducer,
    chapters: chaptersReducer,
})