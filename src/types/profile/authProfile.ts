export type AuthProfile = {
    id: number,
    avatar: string
    slug: string
    name: string
    about: string,
    links: {name: string, link: string}[],
    unread_notifications_count: number,
    subscribers_count: number,
    role: number,
    is_verified: boolean,
    created_at: string
}
