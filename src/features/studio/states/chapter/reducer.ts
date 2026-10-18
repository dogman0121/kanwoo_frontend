import { combineReducers } from "redux";

import pageReducer from "./page.slice"

export const chapterReducer = combineReducers({
    page: pageReducer,
})