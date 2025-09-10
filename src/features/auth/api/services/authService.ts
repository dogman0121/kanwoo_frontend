"use client"

import { clientFetch } from "@/lib/api/clientFetch";


export const authService = {
    async login(login: string, password: string) {
        const response = await clientFetch.post("/auth/login", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({login, password})
        }, false);

        return await response.json();
    },
    
    async register(login: string, email: string, password: string) {
        const response = await clientFetch.post("/auth/register", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({login, email, password})
        })

        return await response.json();
    },

    async forgot(email: string) {
        const response = await clientFetch.post("/auth/forgot", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        })

        return await response.json();
    },

    async recovery(token: string, password: string) {
        const response = await clientFetch.post("/auth/recovery", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token, password})
        })
        
        return await response.json();
    },

    async verify(token: string) {
        const response = await clientFetch.post("/auth/verify", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token})
        })

        return await response.json();
    },
}