import { Profile } from "@/types/profile"

export default interface AdminMangaModerationStatus {
    id: number,
    message: string,
    status_type: {id: number, name: string}
    date: string,
    created_at: string
    creator: Profile
}