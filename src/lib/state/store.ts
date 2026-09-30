import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { mangaPageReducer } from '../../features/manga/states/manga-page/reducer'
import { homePageReducer } from '../../features/home/states/home-page/reducer'
import adminPageReducer from './features/admin-page/adminPageSlice'
import settingsPageReducer from './features/settings-page/slice'
import authProfileCollectionsReducer from '../../features/collection/states/auth-profile-collections-page/slice'
import collectionPageReducer from '../../features/collection/states/collection-page/slice'
import authProfileHistoryPage from "@/features/progress/states/auth-profile-history-page/slice"

import { studioPageReducer } from './features/studio-page/reducer'
import { profilePageReducer } from './features/profile-page/reducer'
import { globalReducer } from '@/features/global/states/reducer'
import { readerReducer } from '@/features/reader/states/reducer'

const rootReducers = combineReducers({
  global: globalReducer,
  reader: readerReducer,
  studioPage: studioPageReducer,
  profilePage: profilePageReducer,
  homePage: homePageReducer,
  mangaPage: mangaPageReducer,
  adminPage: adminPageReducer,
  settingsPage: settingsPageReducer,
  authProfileCollectionsPage: authProfileCollectionsReducer,
  authProfileHistoryPage: authProfileHistoryPage,
  collectionPage: collectionPageReducer 
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