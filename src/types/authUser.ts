export default interface AuthUser {
    id: number,
    login: string,
    email: string,
    avatar: string,
    role: number,
    about: string,
    subscribers_count: number,
    notifications_count: number,
    created_at: string,
    is_verified: boolean
}