import { combineReducers } from "redux";

import appReducer from './app/slice'
import commentsReducer from './comments/slice'
import metaReducer from './meta/meta.slice'
import { authProfileReducer } from './auth-profile/reducer'
import mangaReducer from './manga/slice'
import authReducer from './auth/slice'

export const globalReducer = combineReducers({
    app: appReducer,
    comments: commentsReducer,
    manga: mangaReducer,
    meta: metaReducer,
    authProfile: authProfileReducer,
    auth: authReducer
})