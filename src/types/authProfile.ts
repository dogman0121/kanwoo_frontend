import Profile from "./profile";

export default interface AuthProfile extends Profile {
    subscribers_count: number,
    notifications_count: number,
    is_verified: boolean
}