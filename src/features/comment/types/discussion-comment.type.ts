import { Profile } from "@/features/profile/types/profile.type";
import { Comment } from "./comment.type";

export type DiscussionComment = Comment & {
    reply_to: Profile
}