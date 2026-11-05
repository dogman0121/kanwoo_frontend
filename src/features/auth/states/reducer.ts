import { combineReducers } from "redux";
import { authProfileReducer } from "./auth-profile/reducer";
import authProcessReducer from "./auth/slice"

export const authReducer = combineReducers({
    authProcess: authProcessReducer,
    authProfile: authProfileReducer
})