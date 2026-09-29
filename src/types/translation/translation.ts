import Language from "../language"
import Privacy from "../privacy"
import { Profile } from "../profile"


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
    chapters_count: number
}

export type Context = {
    viewer: {
        is_subscribed: boolean
    }
}

export type Metadata = null