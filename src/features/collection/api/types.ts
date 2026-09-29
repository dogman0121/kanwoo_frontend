import { Collection, CollectionContext, CollectionPermissions } from "@/types/collection"

export type CollectionPageData = {
    collection: Collection,
    permission: CollectionPermissions
}

export type CollectionPageContext = {
    collection: CollectionContext
}