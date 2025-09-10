import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authUserReducer from './features/auth_user/authUserSlice'
import mangaReduces from './features/manga/mangaSlice'

const rootReducers = combineReducers({
  authUser: authUserReducer,
  manga: mangaReduces
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