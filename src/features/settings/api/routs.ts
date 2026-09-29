import { ApiConfig } from "@/lib/api/api-config.type";

export const settingApiConfig: ApiConfig = {
    "/settings/security": {
        GET: {
            mode: "proxy",
            url: "/settings/security"
        }
    },
    "/settings/security/password": {
        GET: {
            mode: "proxy",
            url: "/auth/password"
        }
    },
}