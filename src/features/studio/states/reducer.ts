import { combineReducers } from "redux";

import pageReducer from "./studio-page.slice"
import { profileReducer } from "./profile/reducer";
import { mangaReducer } from "./manga/reducer";
import { translationReducer } from "./translation/reducer";
import { chapterReducer } from "./chapter/reducer";

export const studioPageReducer = combineReducers({
    page: pageReducer,
    profile: profileReducer,
    manga: mangaReducer,
    translation: translationReducer,
    chapter: chapterReducer
})