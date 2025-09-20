import { clientFetch } from "../../clientFetch";

export const userClientApi = {
    async getCurrentUser () {
        const response = await clientFetch.get("/users/me")

        return response.json()
    }
}