import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authProfileReducer from './features/auth_profile/authProfileSlice'
import mangaReducer from './features/manga/mangaSlice'
import listReducer from './features/list/listSlice'
import profileReducer from './features/profile/profileSlice'
import homeReducer from './features/home/homeSlice'
import metaReducer from './features/meta/metaSlice'

const rootReducers = combineReducers({
  authProfile: authProfileReducer,
  manga: mangaReducer,
  list: listReducer,
  profile: profileReducer,
  home: homeReducer,
  meta: metaReducer
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