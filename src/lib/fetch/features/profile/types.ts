import { Collection } from "@/types/collection/collection"
import { AuthProfile, Profile } from "@/types/profile"

export type ProfileContext = {
    viewer: {
        is_subscribed: boolean
    }
}

export type GetProfilePageResponseData  = {
    profile: Profile
}

export type GetProfilePageResponseMetadata = {
    profile: unknown
}

export type GetProfilePageResponseContext = {
    profile: ProfileContext
}


export type GetAuthProfileResponseData = {
    profile: AuthProfile,
    collections: Collection[]
}

export type GetAuthProfileResponseMetadata = null

export type GetAuthProfileResponseContext = null