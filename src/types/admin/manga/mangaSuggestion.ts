import { Profile } from "@/types/profile";

export default interface AdminMangaSuggestion {
    id: number,
    message: string,
    name: string,
    link: string,
    created_at: string,
    creator: Profile,
    resolved_at: string,
    resolver: Profile,
}