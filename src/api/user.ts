import User from "@/types/user";
import { apiClient } from "./client";

export async function getCurrentUser() {
    try {
        const response = await apiClient.get("/users/me");

        if (response.ok){
            const {data} = await response.json();
            return await data as User;
        }
        else 
            return null;
    }
    catch {
        return null;
    }
}
