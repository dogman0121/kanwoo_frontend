import { serverFetch } from "../../serverFetch"

export const profileServerApi = {
    async getProfile(slug: string) {
        const {data, error} = await serverFetch.get(`/profiles/${slug}`)
        
        if (!error) {
            return data
        } else {
            return null;
        }
    },

    async getCurrentProfile() {
        const {data, error} = await serverFetch.get("/profiles/current")

        if (!error)
            return data;
        else
            return null;
    }
}