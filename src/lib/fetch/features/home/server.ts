import { serverFetch } from "../../server-fetch.util"

export const homeServerApi = {
    async getHome() {
        const {data} = await serverFetch.get("/home")

        return data;
    }
}