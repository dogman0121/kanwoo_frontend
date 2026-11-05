import { combineReducers } from "redux";

import appReducer from './app/slice'
import metaReducer from './meta/meta.slice'

export const globalReducer = combineReducers({
    app: appReducer,
    meta: metaReducer,
})