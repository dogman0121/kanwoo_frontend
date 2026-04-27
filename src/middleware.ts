import { NextRequest, NextResponse, userAgent } from "next/server"
import * as jose from "jose"

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    let response: NextResponse

    const headers = new Headers(request.headers)
    let setCookieHeaders: string[] = []

    // При обоновлении токена отключаем middleware 
    if (pathname.includes("/auth/refresh")) {
        return NextResponse.next()
    }

    // Получаем токен
    const accessTokenCookie = request.cookies.get("access_token_cookie")

    if (accessTokenCookie != undefined) {
        try {
            // Получаем дату истечения jwt-токена
            const exp = jose.decodeJwt(accessTokenCookie.value).exp

            // Если токен истек
            if (exp && exp * 1000 < Date.now()) {
                const csrfRefreshToken = request.cookies.get(process.env.NEXT_PUBLIC_CSRF_REFRESH_COOKIE_NAME || "")?.value

                // Запрос на обновление токена
                const refreshResponse = await fetch(new URL("/api/auth/refresh", request.url), {
                    method: "POST",
                    headers: {
                        ...request.headers,
                        "X-CSRF-TOKEN": csrfRefreshToken || "",
                        "Cookie": request.cookies.toString(),
                    },
                })

                // Проверяем успшность запроса
                if (refreshResponse.ok) {
                    setCookieHeaders = refreshResponse.headers.getSetCookie()

                    for (const cookieHeader of setCookieHeaders) {
                        const [part] = cookieHeader.split(";")
                        const [name, value] = part.split("=").map((s) => s.trim())

                        request.cookies.set(name, value)
                    }
                    headers.set("cookie", request.cookies.toString())

                    if (["POST", "PUT", "DELETE", "PATCH"].indexOf(request.method)) {
                        const newCSRF = request.cookies.get(process.env.NEXT_PUBLIC_CSRF_ACCESS_COOKIE_NAME || "")?.value

                        if (newCSRF) 
                            headers.set("X-CSRF-TOKEN", newCSRF)
                    }
                } else {
                    setCookieHeaders.push("access_token_cookie=;max-age=-1;")
                    setCookieHeaders.push("csrf_access_token=;max-age=-1;")
                    setCookieHeaders.push("csrf_refresh_token=;max-age=-1;")
                    setCookieHeaders.push("resfresh_token_cookie=;max-age=-1;")
                }
            }
        } catch (e) {
            console.error("JWT Error:", e)
        }
    }

    if (!pathname.startsWith("/api")) {
        const url = request.nextUrl.clone()
        const { device } = userAgent(request)
        const viewport = device.type || "desktop"

        url.searchParams.set("viewport", viewport)

        response = NextResponse.rewrite(url, {
            request: { headers },
        })

        response.headers.set("X-Device-Type", viewport)
    } else {
        response = NextResponse.next({
            request: { headers },
        })
    }

    if (setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
            response.headers.append("Set-Cookie", cookie)
        })
    }

    return response
}

// Конфигурация матчера (оптимизация производительности)
export const config = {
    matcher: [
        /*
         * Исключаем:
         * 1. /api/auth/refresh (чтобы не было рекурсии на уровне Next.js)
         * 2. /_next (статика и чанки)
         * 3. изображения, фавиконки и т.д.
         */
        "/((?!api/auth/refresh|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
}
