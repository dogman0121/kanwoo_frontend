import Language from "./language";
import { Adult, Genre, Status, Type } from "./manga/manga";
import Privacy from "./privacy";

export default interface Meta {
    manga: {
        genres: Genre[],
        statuses: Status[],
        types: Type[],
        adults: Adult[],
    },
    main: {
        languages: Language[],
        privacies: Privacy[]
    }
}