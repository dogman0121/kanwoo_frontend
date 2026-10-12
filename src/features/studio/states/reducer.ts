import { combineReducers } from "redux";

import pageReducer from "./studio-page.slice"
import profileReducer from './profile.slice'
import mangaReducer from './manga.slice'
import translationReducer from './translation.slice'
import chapterReducer from './chapter.slice'

export const studioPageReducer = combineReducers({
    page: pageReducer,
    profile: profileReducer,
    manga: mangaReducer,
    translation: translationReducer,
    chapter: chapterReducer
})