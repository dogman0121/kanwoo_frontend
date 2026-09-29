"use client"

import { ApiError, ApiResponse, ErrorResponse, Pagination, SuccessResponse } from "./api-response.types";

export type ClientFetchOptions = {
    csrf?: boolean,
    use_json?: boolean
}

export const clientFetch = {

    _getCookie(name: string) {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];

        return cookieValue
    },

    _compileURL(url: string) {
        if (url.startsWith("https"))
            return url

        return "/api" + url
    },

    async _fetch<D, M, C, P>(url: string, payload?: RequestInit) {
        const response = await fetch(
            this._compileURL(url), 
            {
                credentials: "include",
                ...payload,
            }
        )

        const apiResponse: ApiResponse<D, M, C, P> = await response.json();

        if ("error" in apiResponse) {
            const error = apiResponse.error

            throw new ApiError(error.code, error.detail)
        }

        return apiResponse as SuccessResponse<D, M, C, P>;
    },

    _getRequestOptionsWithCSRF(payload: RequestInit, csrf_token: string) {
        const headers = new Headers(payload.headers)
        headers.set("X-CSRF-TOKEN", csrf_token)

        return {
            ...payload,
            headers: headers
        }

    },

    async _sendCSRFRequest<D, M, C, P>(url: string, payload: RequestInit) {
        const csrfAccessToken = this._getCookie(process.env.NEXT_PUBLIC_CSRF_ACCESS_COOKIE_NAME || "");

        if (!csrfAccessToken)
            throw Error("Failed to fetch csrf token.")

        try {
            return await this._fetch<D, M, C, P>(url, this._getRequestOptionsWithCSRF(payload, csrfAccessToken))
        } catch (e) {
            if (e instanceof ApiError) {
                if (e.code == "token_expired") {
                    this._refreshToken()

                    const newCsrfToken = this._getCookie(process.env.NEXT_PUBLIC_CSRF_ACCESS_COOKIE_NAME || "")

                    if (!newCsrfToken)
                        throw Error("Failed to get refreshed tokens")

                    return this._fetch<D, M, C, P>(url, this._getRequestOptionsWithCSRF(payload, newCsrfToken))
                }
            }

            throw e
        }
    },

    async _sendRequest<D=null, M=null, C=null, P=null>(
        url: string, 
        payload?: RequestInit,
        options?: ClientFetchOptions
    ) {

        const headers = new Headers(payload?.headers)
        if (options?.use_json)
            headers.set("Content-Type", "application/json")

        const newPayload = {
            ...payload,
            headers: headers
        }
        
        if (options?.csrf || options?.csrf == undefined){
            return this._sendCSRFRequest<D, M, C, P>(url, newPayload)
        }

        return this._fetch<D, M, C, P>(url, newPayload)
    },

    async _refreshToken() {
        const csrfRefreshToken = this._getCookie(process.env.NEXT_PUBLIC_CSRF_REFRESH_COOKIE_NAME || "");

        if (!csrfRefreshToken)
            throw Error("Failed to fetch refresh csrf token")

        try {
            await this._fetch("/auth/refresh", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfRefreshToken,
                },
            })
        } catch (e) {
            if (e instanceof ApiError) {
                console.error(e.message)
            }
        }
    },

    async get<D, M=null, C=null, P=null>(url: string, payload?: RequestInit) {
        return this._sendRequest<D, M, C, P>(url, {
            ...payload,
            method: "GET"
        }, {csrf: false});
    },

    async post<D, M=null, C=null>(url: string, payload?: RequestInit, options?: ClientFetchOptions) {


        const newPayload = {
            ...payload,
            method: "POST"
        };

        return this._sendRequest<D, M, C>(url, newPayload, options)
    },

    async put<D, M=null, C=null>(url: string, payload?: RequestInit, options?: ClientFetchOptions) {
        const newPayload = {
            ...payload,
            method: "PUT"
        };
        
        return this._sendRequest<D, M, C>(url, newPayload, options)
    },

    async patch<D, M=null, C=null, P=null>(url: string, payload?: RequestInit, options?: ClientFetchOptions) {
        const newPayload = {
            ...payload,
            method: "PATCH"
        };
        
        return this._sendRequest<D, M, C, P>(url, newPayload, options)
    },

    async delete(url: string, payload?: RequestInit, options?: ClientFetchOptions) {
        const newPayload = {
            ...payload,
            method: "DELETE"
        };
        
        return this._sendRequest(url, newPayload, options)
    },
}