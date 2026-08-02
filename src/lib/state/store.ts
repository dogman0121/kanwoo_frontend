import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from "./features/app/appSlice"
import authProfileReducer from './features/authProfile/authProfileSlice'
import mangaPageReducer from './features/mangaPage/mangaSlice'
import profileReducer from './features/profile/profileSlice'
import homePageReducer from './features/homePage/homeSlice'
import metaReducer from './features/meta/metaSlice'
import chapterPageReducer from './features/chapterPage/chapterPageSlice'
import studioPageProfileReducer from './features/studioPage/studioPageProfileSlice'
import studioPageMangaReducer from './features/studioPage/studioPageMangaSlice'
import studioPageTranslationReducer from './features/studioPage/studioPageTranslationSlice'
import studioPageChapterReducer from './features/studioPage/studioPageChapterSlice'
import readingSettingsReducer from './features/readingSettings/readingSettingsSlice'
import historyPageReducer from './features/historyPage/historyPageSlice'
import adminPageReducer from './features/adminPage/adminPageSlice'
import settingsPageReducer from './features/settingsPage/settingsPageSlice'


const rootReducers = combineReducers({
  app: appReducer,
  authProfile: authProfileReducer,
  meta: metaReducer,
  readingSettings: readingSettingsReducer,
  profile: profileReducer,
  homePage: homePageReducer,
  mangaPage: mangaPageReducer,
  chapterPage: chapterPageReducer,
  studioPageProfile: studioPageProfileReducer,
  studioPageManga: studioPageMangaReducer,
  studioPageChapter: studioPageChapterReducer,
  studioPageTranslation: studioPageTranslationReducer,
  historyPage: historyPageReducer,
  adminPage: adminPageReducer,
  settingsPage: settingsPageReducer
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