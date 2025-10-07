import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authUserReducer from './features/auth_user/authUserSlice'
import mangaReducer from './features/manga/mangaSlice'
import listReducer from './features/list/listSlice'
import teamReducer from './features/team/teamSlice'

const rootReducers = combineReducers({
  authUser: authUserReducer,
  manga: mangaReducer,
  list: listReducer,
  team: teamReducer
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducers
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']