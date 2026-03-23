"use client"

import { clientFetch } from "@/lib/fetch/clientFetch";
import AuthProfile from "@/types/authProfile";
import Profile from "@/types/profile/profile";


export const authService = {
    async login(email: string, password: string) {
        const response = await clientFetch.post<AuthProfile[]>("/auth/login", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }, false);

        return response;
    },
    
    async register(code: number, login: string, email: string, password: string) {
        const response = await clientFetch.post<Profile>("/auth/register", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({code, login, email, password})
        }, false)

        return response;
    },

    async forgot(email: string) {
        const response = await clientFetch.post<{success: boolean}>("/auth/forgot", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        }, false)

        return response;
    },

    async recovery(token: string, password: string) {
        return clientFetch.post<{success: boolean}>("/auth/recovery", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token, password})
        }, false)
    },

    async verify(token: string) {
        const response = await clientFetch.post("/auth/verify", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token})
        }, false)

        return response;
    },

    async getProfiles() {
        const response = await clientFetch.get<AuthProfile[]>('/profiles')

        return response
    },

    async createProfile(name: string, slug: string) {
        const createForm = new FormData()

        createForm.append("name", name)
        createForm.append("slug", slug)

        return clientFetch.post<AuthProfile>("/profiles", {
            method: "POST",
            body: createForm
        })
    },

    async selectProfile(profileId: number) {
        return clientFetch.put<{success: boolean}>("/profiles/current", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                profile: profileId
            })
        })
    },

    async getRegisterCode(email: string) {
        return clientFetch.get(`/auth/register/code?email=${email}`)
    }
}