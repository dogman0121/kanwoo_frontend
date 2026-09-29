import { Profile } from "@/types/profile";
import { clientFetch } from "../../client-fetch.util";

export const profileClientApi = { 
    async addProfile(name: string) {
        const formData = new FormData();
        
        formData.append("name", name);

        const response = await clientFetch.post<Profile>("/profiles", {
            body: formData
        });

        return response
    },

    async checkProfileSlug(slug: string) {
        return await clientFetch.get<{available: boolean}>(`/profiles/check_slug?slug=${slug}`);
    },

    async getProfiles() {
        return await clientFetch.get<Profile[]>("/profiles")
    },
    
    async selectProfile(profileId: number) {
        return await clientFetch.post('/profiles/select', {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({profile_id: profileId})
        })
    }
}