import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
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

    async _fetch(url: string, options: RequestInit = {}, customCookies?: string) {
        const cookieStore = await cookies();
        // Используем переданные cookies или текущие из store
        const currentCookies = customCookies || this._cookiesToString(cookieStore);

        const targetUrl = url.startsWith("http") 
            ? url 
            : process.env.NEXT_PUBLIC_API_URL + url;

        return await fetch(targetUrl, {
            credentials: "same-origin",
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'cookie': currentCookies,
                ...options.headers,
            },
        });
    },

    async _sendRequest(url: string, options: RequestInit = {}) {
        let response = await this._fetch(url, options);
        let responseJson = await response.json();

        if (responseJson.error?.code === "unauthorized") {
            if (responseJson.error?.detail?.token == "Token expired") {
                console.log('Token expired, refreshing...');
            
                const refreshResult = await this._refreshToken();
                
                if (refreshResult.success) {
                    // Повторяем запрос с обновленными cookies
                    response = await this._fetch(url, options, refreshResult.cookiesString);
                    responseJson = await response.json();
                }
            }
        }

        return responseJson;
    },

    // Функция обновления токена
    async _refreshToken(): Promise<{ success: boolean; cookiesString?: string }> {
        const cookieStore = await cookies();
        const currentCookiesMap = this._createCookiesMap(cookieStore);
        
        const csrfRefreshToken = currentCookiesMap.get('csrf_refresh_token');

        if (!csrfRefreshToken) {
            console.error("CSRF Refresh token not found");
            return { success: false };
        }

        try {
            // Делаем запрос на обновление с текущими cookies
            const currentCookiesString = this._cookiesToString(cookieStore);
            const response = await this._fetch('/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfRefreshToken,
                },
            }, currentCookiesString);

            if (!response.ok) {
                console.error('Token refresh failed with status:', response.status);
                return { success: false };
            }

            console.log('Token refreshed successfully');

            // Получаем новые cookies из заголовка ответа
            const setCookieHeader = response.headers.get('set-cookie');
            if (setCookieHeader) {
                const updatedCookiesString = this._updateCookiesFromHeader(
                    currentCookiesMap, 
                    setCookieHeader
                );
                return { 
                    success: true, 
                    cookiesString: updatedCookiesString 
                };
            }

            return { success: false };

        } catch (error) {
            console.error('Token refresh error:', error);
            return { success: false };
        }
    },

    // Создает Map из cookies store
    _createCookiesMap(cookieStore: ReadonlyRequestCookies): Map<string, string> {
        const cookiesMap = new Map<string, string>();
        const allCookies = cookieStore.getAll();
        
        allCookies.forEach((cookie: RequestCookie) => {
            cookiesMap.set(cookie.name, cookie.value);
        });
        
        return cookiesMap;
    },

    // Преобразует cookies store в строку
    _cookiesToString(cookieStore: ReadonlyRequestCookies): string {
        const cookiesMap = this._createCookiesMap(cookieStore);
        return this._cookiesMapToString(cookiesMap);
    },

    // Преобразует Map cookies в строку
    _cookiesMapToString(cookiesMap: Map<string, string>): string {
        return Array.from(cookiesMap.entries())
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
    },

    // Обновляет cookies Map на основе заголовка set-cookie
    _updateCookiesFromHeader(
        currentCookiesMap: Map<string, string>, 
        setCookieHeader: string
    ): string {
        // Создаем копию текущих cookies
        const updatedCookiesMap = new Map(currentCookiesMap);
        
        // Парсим заголовок set-cookie
        const cookiesArray = setCookieHeader.split(',').map(cookie => cookie.trim());
        
        for (const cookieString of cookiesArray) {
            // Берем только часть до точки с запятой (name=value)
            const [cookiePart] = cookieString.split(';');
            const [name, ...valueParts] = cookiePart.split('=');
            
            if (name && valueParts.length > 0) {
                const value = valueParts.join('='); // На случай если в value есть =
                const trimmedName = name.trim();
                
                if (value) {
                    // Обновляем или добавляем cookie
                    updatedCookiesMap.set(trimmedName, value);
                } else {
                    // Если значение пустое, удаляем cookie
                    updatedCookiesMap.delete(trimmedName);
                }
            }
        }
        
        return this._cookiesMapToString(updatedCookiesMap);
    }
};