import { serverFetch } from "../../serverFetch"

export const teamServerApi = {
    async getTeam(slug: string) {
        const {data, error} = await serverFetch.get(`/teams/${slug}`)
        
        if (!error) {
            return data
        } else {
            return null;
        }
    }
}