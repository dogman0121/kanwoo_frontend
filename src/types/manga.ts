import User from "./user"

export default interface Manga {
    id: number,
    slug: string,
    name: string,
    name_translations: {
        lang: string,
        name: string
    }[],
    description: string,
    main_poster: {
        orig: string,
        large: string,
        medium: string,
        small: string,
        thumbmain: string,
    },
    background: string,
    type: {
        id: number,
        name: string
    },
    year: number,
    status: {
        id: number,
        name: string
    },
    genres: {
        id: number,
        name: string
    }[]
    views: number,
    saves_count: number,
    authors: User[],
    artists: User[],
    publishers: User[]
}