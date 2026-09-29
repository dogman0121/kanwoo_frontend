"use client"

import { clientFetch } from "@/lib/fetch/client-fetch.util";
import { AuthProfile } from "@/types/profile";

export type LoginWithYandex = {
    accessToken: string,
    expiresIn: string,
    extraData: Record<string, unknown>
    tokenType: "bearer" | "jwt"
}

export const authClientApi = {
    login: async (email: string, password: string) => {
        const response = await clientFetch.post<AuthProfile[]>("/auth/login", {
            body: JSON.stringify({email, password})
        }, {csrf: false, use_json: true});

        return response;
    },

    loginWithYandex: async (data: LoginWithYandex) => {
        const response = await clientFetch.post<AuthProfile[], {created: boolean}>("/auth/login/oauth/yandex", {
            body: JSON.stringify({
                access_token: data.accessToken,
                expires_in: data.expiresIn,
                extra_data: data.extraData,
                token_type: data.tokenType
            })
        }, {use_json: true, csrf: false})

        return response
    },
    
    register: async (code: number, login: string, email: string, password: string) => {
        const response = await clientFetch.post<AuthProfile>("/auth/register", {
            body: JSON.stringify({code, login, email, password})
        }, {csrf: false, use_json: true})

        return response;
    },

    forgot: async (email: string) => {
        const response = await clientFetch.post<{success: boolean}>("/auth/forgot", {
            body: JSON.stringify({email})
        }, {csrf: false, use_json: true})

        return response;
    },

    recovery: async (token: string, password: string) => {
        return clientFetch.post<{success: boolean}>("/auth/recovery", {
            body: JSON.stringify({token, password})
        }, {csrf: false, use_json: true})
    },

    verify: async (token: string) => {
        const response = await clientFetch.post("/auth/verify", {
            body: JSON.stringify({token})
        }, {csrf: false, use_json: true})

        return response;
    },

    getProfiles: async () => {
        const response = await clientFetch.get<AuthProfile[]>('/profiles')

        return response
    },


    createProfile: async (name: string, slug: string) => {
        const createForm = new FormData()

        createForm.append("name", name)
        createForm.append("slug", slug)

        return clientFetch.post<AuthProfile>("/profiles", {
            method: "POST",
            body: createForm
        })
    },

    chooseProfile: async (profileId: number) => {
        return clientFetch.put<{success: boolean}>("/profiles/me", {
            body: JSON.stringify({
                profile: profileId
            })
        }, {use_json: true})
    },

    getRegisterCode: async (email: string) => {
        return clientFetch.get(`/auth/register/code?email=${email}`)
    }
}