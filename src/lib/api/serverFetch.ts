import { cookies } from 'next/headers';

// Базовые методы
export const serverFetch = {
    // GET запрос
    async get(url: string, options?: RequestInit) {
        return this._sendRequest(url, { ...options, method: 'GET' })
    },

    // POST запрос
    async post(url: string, payload?: RequestInit) {
        return this._sendRequest(url, {
            ...payload,
            method: 'POST',
        });
    },

    // PUT запрос
    async put(url: string, payload?: RequestInit) {
        return this._sendRequest(url, {
            ...payload,
            method: 'PUT',
        });
    },

    // DELETE запрос
    async delete(url: string, payload: RequestInit) {
        return this._sendRequest(url, { ...payload, method: 'DELETE' });
    },

    async _fetch(url: string, options: RequestInit = {}) {
        const cookieStore = await cookies();
        const currentCookies = cookieStore.toString();

        if (url.startsWith("http"))
            return await fetch(url, {
                credentials: "same-origin",
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': currentCookies,
                    ...options.headers,
                },
            });
        else
            return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                credentials: "same-origin",
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': currentCookies,
                    ...options.headers,
                },
            });
    },

    // Базовый метод запроса
    async _sendRequest(url: string, options: RequestInit = {}) {
        // Первый запрос
        const response = await this._fetch(url, options)

        let responseJson = await response.json();

        // Если 401 ошибка - обновляем токен и повторяем запрос
        if (responseJson.error?.code === "unauthorized") {
            if (responseJson.error?.detail?.token == "Token expired"){
                console.log('Token expired, refreshing...');
            
                // Обновляем токен
                const refreshResponse = await this._refreshToken();
                
                if (refreshResponse.ok) {
                    const newResponse = await this._fetch(url, {
                        ...options,
                        headers: {
                            ...options.headers,
                            "cookie": refreshResponse.headers.getSetCookie().join(";")
                        }
                    });

                    responseJson = await newResponse.json()
                }
            }
        }

        return await responseJson;
    },

    // Функция обновления токена
    async _refreshToken() {
        const cookieStore = await cookies();

        const csrfRefreshToken = cookieStore.get('csrf_refresh_token')?.value;

        if (!csrfRefreshToken) {
            throw Error("CSRF Refresh token not found")
        }

        const response = await this._fetch('/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfRefreshToken,
            },
        });

        if (response.ok) {
            console.log('Token refreshed successfully');
        }

        return response
    }
};