import { Profile } from "@/types/profile";
import AdminManga from "../manga/manga";

export default interface AdminMangaReport {
    id: number,
    message: string,
    created_at: string,
    creator: Profile,
    resolved_at: string,
    resolver: Profile,
    manga: AdminManga
}