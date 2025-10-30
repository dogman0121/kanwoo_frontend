"use client"

import Manga from "@/types/manga";
import { clientFetch } from "../../clientFetch";
import NameTranslation from "@/types/manga/nameTranslation";

export const mangaClientApi = {
    async addManga(name: string) {
        
    },

    async checkMangaSlug(slug: string) {
        const response = await clientFetch.get(`/manga/check_slug?slug=${slug}`);

        const {data} = await response.json()

        if (data.available)
            return true;
        
        return false
    },

    async updateManga(
        manga: Manga,
        slug: string,
        name: string,
        description: string,
        nameTranslations: NameTranslation[],
        type: number,
        status: number,
        adult: number,
        year: number,
        genres: number[],
        poster?: File,
        posterAction: "keep" | "delete" | "update" = "keep",
        background?: File,
        backgroundAction: "keep" | "delete" | "update" = "keep",
        promoName?: File,
        promoNameAction: "keep" | "delete" | "update" = "keep",
        promoLogo?: File,
        promoLogoAction: "keep" | "delete" | "update" = "keep",
        promoBackground?: File,
        promoBackgroundAction: "keep" | "delete" | "update" = "keep"
    ){
        const formData = new FormData();
    
        formData.append("slug", slug);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("nameTranslations", JSON.stringify(nameTranslations));
        formData.append("type", type.toString());
        formData.append("status", status.toString());
        formData.append("adult", adult.toString());
        formData.append("year", year.toString())
        // setting genres
        for (const genre of genres)
            formData.append("genre", genre.toString());

        if (poster && posterAction == "update")
            formData.append("poster", poster);
        formData.append("posterAction", posterAction);
        
        if (background && backgroundAction == "update")
            formData.append("background", background);
        formData.append("backgroundAction", backgroundAction);
        
        if (promoName && promoNameAction == "update")
            formData.append("promoName", promoName);
        formData.append("promoNameAction", promoNameAction);
        
        if (promoLogo && promoLogoAction == "update")
            formData.append("promoLogo", promoLogo);
        formData.append("promoLogoAction", promoLogoAction);
        
        if (promoBackground && promoBackgroundAction == "update")
            formData.append("promoBackground", promoBackground);
        formData.append("promoBackgroundAction", promoBackgroundAction);

        const response = await clientFetch.put(`/manga/${manga.slug}`, {
            body: formData
        })

        if (!response.ok)
            throw new Error("Failed to update manga")

        const {data} = await response.json();

        return data;
    }
}