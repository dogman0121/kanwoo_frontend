import { serverFetch } from "@/lib/fetch/server-fetch.util";
import { GetHomeContext, GetHomeData } from "./types";
import { HomeMap } from "../types/hero";

export const homeServerAPI = {
    getHomeMap: async () => serverFetch.get<HomeMap, null>('/home')
}