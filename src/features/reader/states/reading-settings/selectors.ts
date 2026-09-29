import { RootState } from "./state";

export const selectReadingSettings = (
    state: RootState
) => {
    return state.reader.settings.settings
}

export const selectInfinityChapter = (
    state: RootState
) => {
    return state.reader.settings.settings.infinityChapter
}

export const selectAligment = (
    state: RootState
) => {
    return state.reader.settings.settings.aligment
}

export const selectVariant = (
    state: RootState
) => {
    return state.reader.settings.settings.variant
}

export const selectPageNumber = (
    state: RootState
) => {
    return state.reader.settings.settings.pageNumbers
}

export const selectIsHydrated = (
    state: RootState
) => {
    return state.reader.settings.isHydrated
}