"use client"

import { ApiResponse } from "@/lib/fetch/apiResponse";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AuthProfile from "@/types/authProfile";


export const authService = {
    async login(email: string, password: string) {
        const response = await clientFetch.post("/auth/login", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }, false);

        return response;
    },
    
    async register(email: string, password: string) {
        const response = await clientFetch.post("/auth/register", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        return response;
    },

    async forgot(email: string) {
        const response = await clientFetch.post<{success: boolean}>("/auth/forgot", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        })

        return response;
    },

    async recovery(token: string, password: string) {
        const response = await clientFetch.post<{success: boolean}>("/auth/recovery", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token, password})
        }, false)
        
        return await response;
    },

    async verify(token: string) {
        const response = await clientFetch.post("/auth/verify", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token})
        })

        return await response;
    },

    async getProfiles() {
        const response = await clientFetch.get<AuthProfile[]>('/profiles/get')

        return response
    },

    async createProfile(name: string, slug: string) {
        return await clientFetch.get<AuthProfile>("/profiles/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                slug: slug
            })
        })
    }
}