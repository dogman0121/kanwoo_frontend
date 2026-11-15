export enum ResourceType {
    BOOK = "book",
    WEBSITE = "website"
}

export type PageMetadata = {
    title: string,
    description: string,
    canonical: string,
    image: string | null,
    type: ResourceType,
    indexable: boolean,
    published_at: string,
    modified_at: string
}