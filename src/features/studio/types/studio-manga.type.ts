import { Manga } from "@/features/manga/types";
import { ModerationStatus } from "./moderation-status.type";

export type StudioManga = Manga & {
    moderation_status: ModerationStatus
}