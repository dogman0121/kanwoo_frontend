import { clientFetch } from "../../clientFetch";

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
    }
}