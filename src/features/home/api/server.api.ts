import { serverFetch } from "@/lib/fetch/server-fetch.util";
import { GetHomeContext, GetHomeData } from "./types";
import { HomePageMap } from "../types/hero";

export const homeServerAPI = {
    getHomeMap: async () => serverFetch.get<HomePageMap, null>('/home')
}