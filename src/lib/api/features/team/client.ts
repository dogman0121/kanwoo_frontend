import Team from "@/types/team";
import { clientFetch } from "../../clientFetch";
import { error } from "console";

export const teamClientApi = { 
    async addTeam(name: string) {
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
        const response = await clientFetch.get(`/teams/check_slug?slug=${slug}`);

        const {data} = await response.json()

        if (data.available)
            return true;
        
        return false
    },

    async updateTeam(
        team: Team,
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

        const response = await clientFetch.put(`/teams/${team.slug}`, {
            body: formData
        });

        if (response.ok){
            const {data} = await response.json()
            return data
        }
        else
            throw Error("Failed to update")
    }
}