import { Profile } from "@/types/profile";

export default interface AdminFeedback {
    id: number,
    created_at: string,
    creator: Profile,
    resolved_at: string,
    resolver: Profile,
    message: string
}