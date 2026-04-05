import Privacy from "../privacy"

export default interface ProfileCollection {
    id: number
    name: string
    description: string
    contain_manga: boolean
    manga_count: number
    privacy: Privacy
}