import { combineReducers } from "redux";

import mainReducer from "./reader.slice"
import readerReaderReducer from "./reader/slice"
import readingSettingsReducer from "./reading-settings/slice"
import commentsReducer from "./comments/slice"

export const readerReducer = combineReducers({
    main: mainReducer,
    reader: readerReaderReducer,
    settings: readingSettingsReducer,
    comments: commentsReducer
})