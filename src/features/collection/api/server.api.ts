import { Collection, CollectionContext } from "@/types/collection"
import { serverFetch } from "../../../lib/fetch/server-fetch.util"
import { CollectionPageContext, CollectionPageData } from "./types"

export const collectionServerAPI = {
    getCollection: async (id: number) => {
        const response = await serverFetch.get<Collection, null, CollectionContext>(`/collections/${id}`)
        
        return response
    },

    getCollectionPage: async (id: number) => {
        const response = await serverFetch.get<CollectionPageData, null, CollectionPageContext>(`/collections/${id}/pages/main`)

        return response
    }
}