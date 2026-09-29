import { ProfileContext } from "@/lib/fetch/features/profile/types"
import { Profile } from "@/types/profile"

export interface ProfilePageState {
    profile?: Profile,
    profileContext?: ProfileContext,
    ui: {
        section: "posts" | "collections",
        infoModalOpen: boolean
    }
}

export const initialState: ProfilePageState = {
    profile: undefined,
    profileContext: undefined,
    ui: {
        section: "posts",
        infoModalOpen: false
    }
}

export type RootState = {
    profilePage: {page: ProfilePageState},
}