import Team from "@/types/profile";
import { clientFetch } from "../../clientFetch";
import { error, profile } from "console";
import Profile from "@/types/profile";

export const profileClientApi = { 
    async addProfile(name: string) {
        const formData = new FormData();
        
        formData.append("name", name);

        const response = await clientFetch.post("/teams/", {
            body: formData
        });

        if (response.ok){
            const {data} = await response.json();
            return data
        } else {
            throw Error("Failed to add list")
        }
    },

    async checkTeamSlug(slug: string) {
        const response = await clientFetch.get(`/profiles/check_slug?slug=${slug}`);

        const {data} = await response.json()

        if (data.available)
            return true;
        
        return false
    },

    async updateProfile(
        profile: Profile,
        name: string,
        slug: string,
        avatarAction: "keep" | "update" | "remove" = 'keep',
        about?: string,
        links?: {name: string, link: string}[],
        avatar?: File,
    ) {
        const formData = new FormData();

        formData.append("name", name)
        formData.append("slug", slug)
        formData.append("avatar_action", avatarAction);

        if (about)
            formData.append("about", about)

        if (avatar)
            formData.append("avatar", avatar)

        if (links)
            formData.append("links", JSON.stringify(links))

        const response = await clientFetch.put(`/profiles/${profile.slug}`, {
            body: formData
        });

        if (response.ok){
            const {data} = await response.json()
            return data
        }
        else
            throw Error("Failed to update")
    },

    async getProfiles() {
        const response = await clientFetch.get("/profiles")

        if (!response.ok) {
            throw Error("Failed to fetch profiles")
        }
        else {
            const {data} = await response.json()
            return data;
        }
    },
    
    async selectProfile(profileId: number) {
        const response = await clientFetch.post('/profiles/select', {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({profile_id: profileId})
        })

        if (response.ok)
            return;
        else
            throw Error("Failed to select profile")
    }
}