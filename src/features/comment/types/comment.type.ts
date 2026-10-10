import { Profile } from "@/features/profile/types/profile.type"

export type Comment = {
    id: number,
    text: string,
    creator: Profile,
    created_at: string,
    replies_count: number,
    up_votes: number,
    down_votes: number,
    reply_to?: Profile
}

export type Context = {
    viewer: {
        vote: number | null
    }
}