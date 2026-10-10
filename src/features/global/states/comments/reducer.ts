import { combineReducers } from "redux"
import CommentsReducer from "./comments/slice"
import SubthreadsReducer from "./subthreads/slice"
import ThreadsReducer from "./threads/slice"

export const commentsReducer = combineReducers({
    comments: CommentsReducer,
    subthreads: SubthreadsReducer,
    threads: ThreadsReducer
})