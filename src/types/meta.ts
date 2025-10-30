import Adult from "./manga/adult";
import Genre from "./manga/genre";
import Status from "./manga/status";
import Type from "./manga/type";

export default interface Meta {
    genres: Genre[],
    statuses: Status[],
    types: Type[],
    adults: Adult[],
}