import { Profile } from "@/features/profile/types/profile.type"
import Language from "@/types/language"
import Privacy from "@/types/privacy"
import { ReferenceEntity } from "@/types/reference-entity"



export type TranslationShort = {
    id: number,
    owner: Profile
    chapters_count: number,
    is_official: boolean
}

export type Translation = TranslationShort & {
    name: string
    privacy: Privacy,
    lang: Language,
    created_at: string,
    creator: Profile,
    chapters_count: number,
    default_reading_mode: ReferenceEntity
}

export type Context = {
    viewer: {
        is_subscribed: boolean
    }
}

export type Metadata = null