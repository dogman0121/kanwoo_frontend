import { combineReducers } from "redux";
import readingProgressesReducer from "./reading-progress.slice"
import pageReducer from "./slice"

export const homePageReducer = combineReducers({
    progresses: readingProgressesReducer,
    page: pageReducer
})