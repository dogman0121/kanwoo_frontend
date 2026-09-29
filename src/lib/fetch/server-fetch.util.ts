import { cookies } from 'next/headers';
import { ApiError, SuccessResponse } from './api-response.types';


export const serverFetch = {
    async get<D, M=null, C=null, P=null>(url: string, options?: RequestInit) {
        return this._sendRequest<D, M, C, P>(url, { ...options, method: 'GET' })
    },

    async post<D, M=null, C=null>(url: string, payload?: RequestInit) {
        return this._sendRequest<D, M, C>(url, {
            ...payload,
            method: 'POST',
        });
    },

    async put<D, M=null, C=null>(url: string, payload?: RequestInit) {
        return this._sendRequest<D, M, C>(url, {
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

    async _sendRequest<D, M=null, C=null, P=null>(url: string, options: RequestInit) {
        const response = await this._fetch(url, options)

        const apiData = await (response.json())

        if (response.ok) {
            return apiData as SuccessResponse<D, M, C, P>;
        }

        throw new ApiError(apiData.error.code, apiData.error.detail)
    },

};