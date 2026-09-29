import { Link } from "./link"


export type Profile = {
    id: number,
    avatar: string
    slug: string
    name: string
    about: string,
    links: Link[],
    created_at: string,
    subscribers_count: number
}