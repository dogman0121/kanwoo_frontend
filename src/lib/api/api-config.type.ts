import { authApiConfig } from "@/features/auth/api/routes";
import { HTTP_METHODS } from "./methods.type";
import { Node } from "./node.type";
import { initApiConfig } from "./process-query";
import { mangaApiConfig } from "@/features/manga/api/routes";
import { profileApiConfig } from "@/features/profile/api/routes";
import { studioApiConfig } from "@/features/studio/api/routes";
import { adminApiConfig } from "@/features/admin/api/routes";
import { chapterApiConfig } from "@/features/chapter/api/routes";
import { collectionApiConfig } from "@/features/collection/api/routes";
import { commentApiConfig } from "@/features/comment/api/routes";
import { globalApiConfig } from "@/features/global/api/routes";
import { homeApiConfig } from "@/features/home/api/routes";
import { searchApiConfig } from "@/features/search/api/routes";
import { settingApiConfig } from "@/features/settings/api/routs";
import { progressApiConfig } from "@/features/progress/api/routes";
import { readerRoutes } from "@/features/reader/api/routes";

export type AggregateURL = {
    name: string
    method?: HTTP_METHODS,
    url: string
}

export type RouteConfig = {
    [method in HTTP_METHODS]?: {
        mode: "proxy" | "aggregate" | "transform",
        method?: HTTP_METHODS,
        url?: string
        urls?: AggregateURL[],
        transformRequest?: (req: Request, params: Record<string, string>) => Promise<Request>
        transformResponse?: (resp: Response) => Promise<Response>
    }
}

export type ApiConfig = {
    [sourse: string]: RouteConfig
}

export const apiConfig: ApiConfig = {
    ...globalApiConfig,
    ...readerRoutes,
    ...searchApiConfig,
    ...settingApiConfig,
    ...homeApiConfig,
    ...authApiConfig,
    ...profileApiConfig,
    ...mangaApiConfig,
    ...progressApiConfig,
    ...chapterApiConfig,
    ...collectionApiConfig,
    ...commentApiConfig,
    ...studioApiConfig,
    ...adminApiConfig
}

export const router: Node = initApiConfig(apiConfig)