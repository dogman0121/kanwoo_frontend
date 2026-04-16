"use client"

import { ApiError, ApiResponse, ErrorResponse, SuccessResponse } from "./apiResponse";

export const clientFetch = {

    _getCookie(name: string) {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];

        return cookieValue
    },

    async _sendCSRFRequest<T>(url: string, payload: RequestInit) {
        const csrfAccessToken = this._getCookie(process.env.NEXT_PUBLIC_CSRF_ACCESS_COOKIE_NAME || "");

        if (!csrfAccessToken)
            throw Error("Failed to fetch csrf token.")

        try {
            const response = await this._sendRequest<T>(url, {
                ...payload,
                headers: {
                    "X-CSRF-TOKEN": csrfAccessToken,
                    ...payload.headers
                }
            })

            return response
        } catch (e) {
            if (e instanceof ApiError){
                if (e.code == "token_expired") {
                    this._refreshToken()

                    const newCsrfToken = this._getCookie(process.env.NEXT_PUBLIC_CSRF_ACCESS_COOKIE_NAME || "");

                    if (!newCsrfToken)
                        throw Error("Failed to get refreshed tokens")

                    return await this._sendRequest<T>(url, {
                        ...payload,
                        headers: {
                            "X-CSRF-TOKEN": newCsrfToken,
                            ...payload.headers
                        }
                    })
                }
            }

            throw e
        }
    },

    async _sendRequest<T>(url: string, payload?: RequestInit) {
        const response = await this._fetch(url, payload);

        const apiResponse: ApiResponse<T> = await response.json();

        if (!response.ok){
            const error = (apiResponse as ErrorResponse).error

            throw new ApiError(error.code, error.detail)
        }

        return apiResponse as SuccessResponse<T>;
    },

    async _refreshToken() {
        const csrfRefreshToken = this._getCookie("csrf_refresh_token");

        if (!csrfRefreshToken)
            throw Error("Failed to fetch refresh csrf token")

        const response = await this._fetch("/auth/refresh", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfRefreshToken,
            },
        })
    
        if (!response.ok) 
            throw new Error("Failed to refresh token");

        // document.cookie = response.headers.getSetCookie().join(";");
    },

    async _fetch(url: string, payload?: RequestInit) {
        if (url.startsWith("http")){
            return await fetch(url, {
                credentials: "include",
                ...payload,
            })
        }
        else {
            return await fetch("/api" + url, {
                credentials: "include",
                ...payload,
            })
        }
    },

    async get<T>(url: string, payload?: RequestInit) {
        return this._sendRequest<T>(url, {
            ...payload,
            method: "GET"
        });
    },

    async post<T>(url: string, payload?: RequestInit, csrf?: boolean) {
        const newPayload = {
            ...payload,
            method: "POST"
        };

        if (csrf != undefined)
            return csrf ?
                this._sendCSRFRequest<T>(url, newPayload)
                : this._sendRequest<T>(url, newPayload)

        return this._sendCSRFRequest<T>(url, newPayload)
    },

    async put<T>(url: string, payload?: RequestInit, csrf?: boolean) {
        const newPayload = {
            ...payload,
            method: "PUT"
        };
        
        if (csrf != undefined)
            return csrf ?
                this._sendCSRFRequest<T>(url, newPayload)
                : this._sendRequest<T>(url, newPayload)
                
        return this._sendCSRFRequest<T>(url, newPayload)
    },

    async patch<T>(url: string, payload?: RequestInit, csrf?: boolean) {
        const newPayload = {
            ...payload,
            method: "PATCH"
        };
        
        if (csrf != undefined)
            return csrf ?
                this._sendCSRFRequest<T>(url, newPayload)
                : this._sendRequest<T>(url, newPayload)
                
        return this._sendCSRFRequest<T>(url, newPayload)
    },

    async delete(url: string, payload?: RequestInit, csrf: boolean = true) {
        const newPayload = {
            ...payload,
            method: "DELETE"
        };
        
        if (csrf != undefined)
            return csrf ?
                this._sendCSRFRequest(url, newPayload)
                : this._sendRequest(url, newPayload)
                
        return this._sendCSRFRequest(url, newPayload)
    },
}