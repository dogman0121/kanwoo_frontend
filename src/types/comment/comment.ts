import Profile from "../profile/profile";

export default interface Comment {
    id: number,
    text: string,
    creator: Profile,
    created_at: string,
    answers_count: number,
    up_votes: number,
    down_votes: number
}