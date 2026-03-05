import Language from "./language";
import Adult from "./manga/adult";
import Genre from "./manga/genre";
import Status from "./manga/status";
import Type from "./manga/type";
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