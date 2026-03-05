import { clientFetch } from "@/lib/fetch/clientFetch";
import Profile from "@/types/profile/profile";
import ProfileReadingProgress from "@/types/profile/profileReadingProgress";

class HistoryService {
    async getProgress(profile: Profile) {
        return await clientFetch.get<ProfileReadingProgress[]>(`/profiles/${profile.slug}/getHistory`)
    }

    async deleteProgress(progress: ProfileReadingProgress) {
        return await clientFetch.post(`/manga/${progress.manga.slug}/deleteProgress`, {
            body: JSON.stringify({
                manga_id: progress.manga.id
            })
        })
    }
}

export const historyService = new HistoryService()