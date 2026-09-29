import { Profile } from "../profile"

export type Post = {
    id: number,
    text: string,
    cretor: Profile,
    created_at: string
}