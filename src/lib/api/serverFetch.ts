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

    // Базовый метод запроса
    async _sendRequest(url: string, options: RequestInit = {}) {
        const cookieStore = await cookies();
        const currentCookies = cookieStore.toString();

        // Первый запрос
        let response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(currentCookies && { Cookie: currentCookies }),
                ...options.headers,
            },
        });

        // Если 401 ошибка - обновляем токен и повторяем запрос
        if (response.status === 401) {
            console.log('Token expired, refreshing...');
            
            // Обновляем токен
            const refreshSuccess = await refreshToken();
            
            if (refreshSuccess) {
                    // Повторяем запрос с обновленными куками
                    const newCookies = cookieStore.toString();
                    response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(newCookies && { Cookie: newCookies }),
                        ...options.headers,
                    },
                });
            }
        }

        return response.json();
    }
};

// Функция обновления токена
async function refreshToken(): Promise<boolean> {
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