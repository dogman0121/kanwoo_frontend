import { NextRequest, NextResponse, userAgent } from 'next/server'
import * as jose from "jose"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response: NextResponse;

  // Recursion protect
  if (pathname.includes("/auth/refresh")) {
    return NextResponse.next();
  }

  const headers = new Headers(request.headers);
  let setCookieHeaders: string[] = [];

  // Refreshing tokens if expired
  const accessTokenCookie = request.cookies.get("access_token_cookie");

  if (accessTokenCookie) {
    try {
      const jwtData = jose.decodeJwt(accessTokenCookie.value);
      const exp = jwtData.exp;

      if (exp && exp * 1000 < Date.now()) {
        const csrfRefreshToken = request.cookies.get("csrf_refresh_token")?.value;
        
        const refreshResponse = await fetch(new URL("/api/auth/refresh", request.url), {
          method: "POST",
          headers: { 
            ...request.headers,
            "X-CSRF-TOKEN": csrfRefreshToken || "",
            "Cookie": request.cookies.toString()
          },
        });

        if (refreshResponse.ok) {
          setCookieHeaders = refreshResponse.headers.getSetCookie();
          
          // Set updated cookies
          for (const cookieHeader of setCookieHeaders) {
            const [part] = cookieHeader.split(";");
            const [name, value] = part.split("=").map(s => s.trim());

            request.cookies.set(name, value);
          }
          headers.set("cookie", request.cookies.toString());

          const newCSRF = request.cookies.get("csrf_access_token")?.value;
          if (newCSRF) headers.set("X-CSRF-TOKEN", newCSRF);
        }
      }
    } catch (e) {
      console.error("JWT Error:", e);
    }
  }
  
  
  // If page, detect client device
  if (!pathname.startsWith("/api")) {
    const url = request.nextUrl.clone();
    const { device } = userAgent(request);
    const viewport = device.type || 'desktop';

    // Add device in searchParams
    url.searchParams.set('viewport', viewport);

    response = NextResponse.rewrite(url, {
      request: { headers }
    });
    response.headers.set("X-Device-Type", viewport);
  } else {
    response = NextResponse.next({
      request: { headers }
    });
  }

  // Add Set-Cookie
  if (setCookieHeaders.length > 0) {
    setCookieHeaders.forEach(cookie => {
      response.headers.append("Set-Cookie", cookie);
    });
  }

  return response;
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
    '/((?!api/auth/refresh|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
