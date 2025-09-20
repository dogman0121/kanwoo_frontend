"use client"

export const clientFetch = {

    _getCookie(name: string) {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];

        return cookieValue
    },

    async _sendCSRFRequest(url: string, payload: RequestInit) {
        const csrfAccessToken = this._getCookie("csrf_access_token");

        if (!csrfAccessToken)
            throw Error("Failed to fetch csrf token.")

        // fetch with csrf token
        const response = await this._fetch(url, {
            ...payload,
            headers: {
                "X-CSRF-TOKEN": csrfAccessToken,
                ...payload.headers
            }
        })

        if (response.status == 401){
            this._refreshToken()

            const newCsrfToken = this._getCookie("csrf_access_token");

            if (!newCsrfToken)
                throw Error("Failed to get refreshed tokens")

            return await this._fetch(url, {
                ...payload,
                headers: {
                    "X-CSRF-TOKEN": newCsrfToken,
                    ...payload.headers
                }
            })
        }

        return response;
    },

    async _sendRequest(url: string, payload?: RequestInit) {
        const response = await this._fetch(url, payload);

        return response;
    },

    async _refreshToken() {
        const csrfRefreshToken = this._getCookie("csrf_refresh_token");

        if (!csrfRefreshToken)
            throw Error("Failed to fetch refresh csrf token")

        const response = await this.post("/auth/refresh", {
            headers: {
                "X-CSRF-TOKEN": csrfRefreshToken
            },
        }, false)
    
        if (!response.ok) 
            throw new Error("Failed to refresh token");
    },

    async _fetch(url: string, payload?: RequestInit) {
        if (url.startsWith("http")){
            return await fetch(url, {
                credentials: "include",
                ...payload,
            })
        }
        else {
            return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                credentials: "include",
                ...payload,
            })
        }
    },

    async get(url: string, payload?: RequestInit) {
        return this._sendRequest(url, {
            ...payload,
            method: "GET"
        });
    },

    async post(url: string, payload?: RequestInit, csrf: boolean = true) {
        const newPayload = {
            ...payload,
            method: "POST"
        }

        if (csrf)
            return this._sendCSRFRequest(url, newPayload);
        else 
            return this._sendRequest(url, newPayload)
    },

    async put(url: string, payload?: RequestInit, csrf: boolean = true) {
        const newPayload = {
            ...payload,
            method: "PUT"
        }

        if (csrf)
            return this._sendCSRFRequest(url, newPayload);
        else 
            return this._sendRequest(url, newPayload)
    },

    async patch(url: string, payload?: RequestInit, csrf: boolean = true) {
        const newPayload = {
            ...payload,
            method: "PATCH"
        }

        if (csrf)
            return this._sendCSRFRequest(url, newPayload);
        else 
            return this._sendRequest(url, newPayload)
    },

    async delete(url: string, payload?: RequestInit, csrf: boolean = true) {
        const newPayload = {
            ...payload,
            method: "DELETE"
        }

        if (csrf)
            return this._sendCSRFRequest(url, newPayload);
        else 
            return this._sendRequest(url, newPayload)
    },
}