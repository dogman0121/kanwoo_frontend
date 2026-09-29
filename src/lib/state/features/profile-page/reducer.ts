import { combineReducers } from "redux"
import pageReducer from "./page/slice"
import postsReducer from "./posts/slice"

export const profilePageReducer = combineReducers({
    page: pageReducer,
    posts: postsReducer
})