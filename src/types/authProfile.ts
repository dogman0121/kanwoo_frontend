import Profile from "./profile/profile";

export default interface AuthProfile extends Profile {
    subscribers_count: number,
    notifications_count: number,
    role: number,
    is_verified: boolean
}