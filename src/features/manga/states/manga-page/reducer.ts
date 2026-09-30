import ProgressReducer from "./progress/slice"
import PageReducer from './page/slice'
import TranslationsReducer from './translations/slice'
import { combineReducers } from "redux"
import CommentsReducer from "./comments/slice"

export const mangaPageReducer = combineReducers({
    page: PageReducer,
    progress: ProgressReducer,
    translations: TranslationsReducer,
    comments: CommentsReducer
})
