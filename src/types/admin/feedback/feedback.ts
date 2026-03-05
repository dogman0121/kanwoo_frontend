import Profile from "@/types/profile/profile";

export default interface AdminFeedback {
    id: number,
    created_at: string,
    creator: Profile,
    resolved_at: string,
    resolver: Profile,
    message: string
}