import { Privacy } from "@/components/PrivacySelect"
import { Page } from "@/features/chapter/types"

export type GetCreateChapterFormResponseData = {
    name: string,
    chapter: number
    extra_number: number | null,
    privacy_id: Privacy,
    pages: Page[],
    blocked_fields: string[]
}