import { cookies } from 'next/headers';
import { ApiError, SuccessResponse } from './apiResponse';


export const serverFetch = {
    async get<T>(url: string, options?: RequestInit) {
        return this._sendRequest<T>(url, { ...options, method: 'GET' })
    },

    async post<T>(url: string, payload?: RequestInit) {
        return this._sendRequest<T>(url, {
            ...payload,
            method: 'POST',
        });
    },

    async put<T>(url: string, payload?: RequestInit) {
        return this._sendRequest<T>(url, {
            ...payload,
            method: 'PUT',
        });
    },

    async delete(url: string, payload: RequestInit) {
        return this._sendRequest(url, {
            ...payload, 
            method: 'DELETE' 
        });
    },

    async _fetch(url: string, options: RequestInit) {
        const cookieStore = await cookies();

        const targetUrl = url.startsWith("http") 
            ? url 
            : process.env.NEXT_PUBLIC_SITE_URL + "/api" + url;

        return await fetch(targetUrl, {
            ...options,
            headers: {
                'cookie': cookieStore.toString(),
                ...options.headers,
            },
        });
    },

    async _sendRequest<T>(url: string, options: RequestInit) {
        const response = await this._fetch(url, options)

        const apiData = await (response.json())

        if (response.ok) {
            return apiData as SuccessResponse<T>;
        }

        throw new ApiError(apiData.error.code, apiData.error.detail)
    },

};