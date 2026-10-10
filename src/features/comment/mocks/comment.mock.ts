import { profileMock } from "@/features/profile/mocks/profile.mock";
import { Comment } from "../types/comment.type";

export const commentMock: Comment = {
    id: 1,
    text: `Я видел как этот человек играет в домино!!! Это ужас воплоти. Даже мой сосед сидит дома и играем в геншин импакт`,
    creator: profileMock,
    created_at: "2026-06-05T14:30:00Z",
    replies_count: 12,
    up_votes: 12,
    down_votes: 5
}