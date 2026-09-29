import { ApiConfig } from "@/lib/api/api-config.type";

export const homeApiConfig: ApiConfig = {
    "/home": {
        GET: {
            mode: "proxy",
            url: "/home"
        }
    },
    "/home/blocks/:hash": {
        GET: {
            mode: "proxy",
            url: "/home/blocks/:hash"
        }
    }
}