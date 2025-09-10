import { apiClient } from "./client";

export async function getManga(slug: string) {
    try {
        const response = await apiClient.get(`/manga/${slug}`);

        const {data} = await response.json();
        
        if (data)
            return data;
        else
            return null;
    } catch {
        return null;
    }
}