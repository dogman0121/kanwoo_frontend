import Manga from "@/types/manga/manga";
import { clientFetch } from "../../clientFetch"
import Profile from "@/types/profile/profile";
import Translation from "@/types/translation/translation";

export const studioClientApi = {
    async getProfileManga(profileSlug: string) {
        return await clientFetch.get<Manga[]>(`/studio/profile/${profileSlug}/getManga`);
    },

    async checkMangaSlug(slug: string) {
        const response = await clientFetch.get<{available: boolean}>(`/studio/manga/checkSlug?slug=${slug}`);

        return response
    },

    async updateManga(
        manga: Manga,
        slug: string,
        name: string,
        description: string,
        nameTranslations: {lang: number, name: string}[],
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

        const response = await clientFetch.post<Manga>(`/studio/manga/${manga.slug}/updateManga`, {
            body: formData
        })

        return response;
    },

    async updateProfile(
        profile: Profile,
        name: string,
        slug: string,
        avatarAction: "keep" | "update" | "remove" = 'keep',
        about?: string,
        links?: {name: string, link: string}[],
        avatar?: File,
    ) {
        const formData = new FormData();

        formData.append("name", name)
        formData.append("slug", slug)
        formData.append("avatar_action", avatarAction);

        if (about)
            formData.append("about", about)

        if (avatar)
            formData.append("avatar", avatar)

        if (links)
            formData.append("links", JSON.stringify(links))

        const response = await clientFetch.post<Profile>(`/studio/profile/${profile.slug}/updateProfile`, {
            body: formData
        });

        return response;
    },

    async deleteManga(mangaSlug: string) {
        return await clientFetch.post(`/studio/manga/${mangaSlug}/deleteManga`)
    },

    async getMangaTranslations(mangaSlug: string) {
        return await clientFetch.get<Translation[]>(`/studio/manga/${mangaSlug}/getTranslations`)
    },

    async createMangaTranslation(mangaSlug: string, translationName: string, translationPrivacy: number) {
        return await clientFetch.post<Translation>(`/studio/manga/${mangaSlug}/createTranslation`, {
            body: JSON.stringify({
                name: translationName,
                privacy: translationPrivacy,
                is_official: true
            })
        })
    },

    async getProfileTranslations(profileSlug: string) {
        return await clientFetch.get<Translation[]>(`/studio/profile/${profileSlug}/getTranslations`)
    },

    async getTranslation(translationId: number) {
        return await clientFetch.get<Translation>(`/studio/translation/${translationId}/getTranslation`)
    }

}