import Manga from "../manga/manga"
import Privacy from "../privacy"

export default interface Collection {
    id: number
    name: string
    description: string,
    privacy: Privacy,
    manga: Manga[]
}