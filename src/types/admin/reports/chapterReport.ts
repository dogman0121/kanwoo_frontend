import { Chapter } from "@/types/chapter";
import { Profile } from "@/types/profile";

export default interface AdminChapterReport {
    id: number,
    message: string,
    created_at: string,
    creator: Profile,
    resolved_at: string,
    resolver: Profile,
    chapter: Chapter
}