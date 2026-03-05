import { serverFetch } from "../../serverFetch"

export const homeServerApi = {
    async getHome() {
        const {data} = await serverFetch.get("/home")

        return data;
    }
}