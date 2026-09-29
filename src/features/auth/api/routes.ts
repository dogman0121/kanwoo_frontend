import { ApiConfig } from "@/lib/api/api-config.type";

export const authApiConfig: ApiConfig = {
    "/auth/register": {
        POST: {
            mode: "proxy",
            url: "/auth/register"
        }
    },
    "/auth/register/code": {
        GET: {
            mode: "proxy",
            url: "/auth/register/code"
        }
    },
    "/auth/login": {
        POST: {
            mode: "proxy",
            url: "/auth/login"
        }
    },
    "/auth/oauth/yandex": {
        POST: {
            mode: "proxy",
            url: "/auth/login/oauth/yandex"
        }
    },
    "/auth/forgot": {
        POST: {
            mode: "proxy",
            url: "/auth/forgot"
        }
    },
    "/auth/logout": {
        POST: {
            mode: "proxy",
            url: "/auth/logout"
        }
    },
    "/auth/recovery": {
        POST: {
            mode: "proxy",
            url: "/auth/recovery"
        }
    },
    "/auth/refresh": {
        POST: {
            mode: "proxy",
            url: "/auth/refresh"
        }
    },
    "/auth/verify": {
        POST: {
            mode: "proxy",
            url: "/auth/verify"
        }
    },
}