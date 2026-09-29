import { RootState } from "./state";

export const selectProfile = (state: RootState) => {
    return state.profilePage.page.profile
}

export const selectSection = (state: RootState) => {
    return state.profilePage.page.ui.section
}

export const selectIsSubscribed = (state: RootState) => {
    return state.profilePage.page.profileContext?.viewer.is_subscribed
}

export const selectInfoModalOpen = (state: RootState) => {
    return state.profilePage.page.ui.infoModalOpen
}