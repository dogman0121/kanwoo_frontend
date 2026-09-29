import { Collection } from "@/types/collection"
import { clientFetch } from "../../../lib/fetch/client-fetch.util"
import { CollectionPageContext, CollectionPageData } from "./types"
import { MangaShort } from "@/types/manga"

export const collectionClientApi = {
    getCollections: async (scope: "owned" | "all" = "all") => {
        const response  = await clientFetch.get<Collection[]>(`/collections?scope=${scope}`)

        return response
    },

    getCollection: async (collectionId: number) => {
        const response = await clientFetch.get<Collection>(`/collections/${collectionId}`)

        return response
    }, 

    createCollection: async (name: string, privacyID: number) => {
        const response = await clientFetch.post<Collection>("/collections", {
            body: JSON.stringify({
                name: name,
                privacy: privacyID
            })
        }, {use_json: true})

        return response
    },

    updateCollection: async (collectionID: number, name: string, privacyID: number) => {
        const response = await clientFetch.put<Collection>(`/collections/${collectionID}`, {
            body: JSON.stringify({
                name: name,
                privacy: privacyID
            })
        }, {use_json: true})

        return response
    },

    deleteCollection: async (collectionId: number) => await clientFetch.delete(`/collections/${collectionId}`),

    getCollectionPage: async (id: number) => {
        const response = await clientFetch.get<CollectionPageData, null, CollectionPageContext>(`/collections/${id}/pages/main`)

        return response
    },

    addManga: async (collectionID: number, mangaSlug: string) => {
        const response = await clientFetch.post<{"success": boolean}>(`/collections/${collectionID}/manga`, {
            body: JSON.stringify({
                manga: mangaSlug
            })
        }, {use_json: true})

        return response
    },

    removeManga: async (collectionID: number, mangaSlug: string) => {
        const response = await clientFetch.delete(`/collections/${collectionID}/manga`, {
            body: JSON.stringify({
                manga: mangaSlug
            })
        }, {use_json: true})

        return response
    },

    getManga: async (id: number) => await clientFetch.get<MangaShort[]>(`/collections/${id}/manga`)
}