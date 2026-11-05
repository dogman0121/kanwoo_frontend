import { combineReducers } from "redux";
import AuthProfileReducer from "./auth-profile.slice"
import CollectionsReducer from "./collections.slice"

export const authProfileReducer = combineReducers({
    profile: AuthProfileReducer,
    collections: CollectionsReducer
})