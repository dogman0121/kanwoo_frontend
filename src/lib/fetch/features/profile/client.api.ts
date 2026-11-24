import { Profile } from "@/types/profile";
import { clientFetch } from "../../client-fetch.util";
import { Collection } from "@/types/collection";
import { CollectionContext } from "@/features/collection/types";

export const profileClientApi = { 
    addProfile(name: string) {
        const formData = new FormData();
        
        formData.append("name", name);

        const response = clientFetch.post<Profile>("/profiles", {
            body: formData
        });

        return response
    },

    checkProfileSlug(slug: string) {
        return clientFetch.get<{available: boolean}>(`/profiles/check_slug?slug=${slug}`);
    },

    getProfiles() {
        return clientFetch.get<Profile[]>("/profiles")
    },
    
    selectProfile(profileId: number) {
        return clientFetch.put('/profiles/me', {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({profile_id: profileId})
        })
    },

    getCollections() {
        return clientFetch.get<Collection[], null, CollectionContext[]>("/collections")
    }
}