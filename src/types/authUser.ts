export default interface AuthUser {
    id: number,
    login: string,
    email: string,
    avatar: string,
    role: number,
    about: string,
    subscribers_count: number | null,
    notifications_count: number | null,
    created_at: string | null,
    is_verified: boolean
}