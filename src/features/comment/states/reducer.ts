import { combineReducers } from "redux"

import commentReducer from "./comments/slice" 
import threadsReducer from "./threads/slice"
import subthreadsReducer from "./subthreads/slice"

export const commentsReducer = combineReducers({
    comments: commentReducer,
    threads: threadsReducer,
    subthreads: subthreadsReducer
})