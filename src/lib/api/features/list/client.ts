import { clientFetch } from "../../clientFetch";

export const listClientApi = {
    async addList(name: string, visibility: "link" | "public" | "private") {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("visibility", visibility)

        const response = await clientFetch.post("/lists/", {
            body: formData
        });

        if (response.ok){
            const {data} = await response.json();
            return data
        } else {
            throw Error("Failed to add list")
        }
    }
}