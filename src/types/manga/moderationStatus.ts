export default interface ModerationStatus {
    id: number,
    message: string,
    status_type: {id: number, name: string}
    date: string,
    created_at: string
}