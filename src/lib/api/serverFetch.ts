import { cookies } from 'next/headers';

// Базовые методы
export const serverFetch = {
    // GET запрос
    async get(url: string, options?: RequestInit) {
        return this._sendRequest(url, { ...options, method: 'GET' })
    },

    // POST запрос
    async post<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
        return this._sendRequest(url, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    },

    // PUT запрос
    async put<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
        return this._sendRequest(url, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    },

    // DELETE запрос
    async delete<T>(url: string, options?: RequestInit): Promise<T> {
        return this._sendRequest(url, { ...options, method: 'DELETE' });
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