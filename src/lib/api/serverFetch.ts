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
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(currentCookies && { Cookie: currentCookies }),
                    ...options.headers,
                },
            });
        else
            return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(currentCookies && { Cookie: currentCookies }),
                    ...options.headers,
                },
            });
    },

    // Базовый метод запроса
    async _sendRequest(url: string, options: RequestInit = {}) {
        // Первый запрос
        let response = await this._fetch(url, options)

        // Если 401 ошибка - обновляем токен и повторяем запрос
        if (response.status === 401) {
            console.log('Token expired, refreshing...');
            
            // Обновляем токен
            const refreshSuccess = await this._refreshToken();
            
            if (refreshSuccess) {
                response = await this._fetch(url, options);
            }
        }

        return response.json();
    },

    // Функция обновления токена
    async _refreshToken() {
        try {
            const cookieStore = await cookies();
            const refreshToken = cookieStore.get('refresh-token')?.value;

            if (!refreshToken) {
            return false;
            }

            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                console.log('Token refreshed successfully');
                return true;
            }

            return false;
        } catch (error) {
                console.error('Token refresh failed:', error);
                return false;
        }
    }
};