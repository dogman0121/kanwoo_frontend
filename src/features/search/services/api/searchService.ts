"use client"

import { clientFetch } from "@/lib/fetch/clientFetch";
import Manga from "@/types/manga/manga";
import SearchSection from "../../types/searchSection";


class SearchService {    
    async search(query: string, section: SearchSection, filters: Map<string, string[]>, page: number, perPage: number) {
        const params = this.compileParams(query, section, filters);
        params.set("page", page.toString())
        params.set("per_page", perPage.toString())

        return await clientFetch.get<Manga[]>("/search?" + new URLSearchParams(params).toString())
    }

    compileParams(query: string, section: SearchSection, filters?: Map<string, string[]>) {
        const params = new URLSearchParams();

        if (query) params.set("query", query);
        
        params.set("section", section);
        
        filters?.forEach((value, key) => {
            value.forEach((option) => {
                params.append(key, option);
            })
        })

        return params;
    }

    parseParams(params: URLSearchParams){
        let query = "";

        let section = SearchSection.MANGA;

        const filters = new Map<string, string[]>();

        for (const [name, val] of params.entries()){
            if (name == "query")
                query = val;
            else if (name == "section")
                section = (val == "manga" ? SearchSection.MANGA : SearchSection.PROFILE)
            else {
                const lst = filters.get(name) || [];
                lst.push(val)

                filters.set(name, lst);
            }

        }

        return {query: query, section: section, filters: filters};
    }
}

export const searchService = new SearchService();