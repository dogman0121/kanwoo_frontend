export type ModerationStatus = {
    id: number,
    status_type: {
        id: number,
        name: string
    }
    message: string,
    created_at: string
}