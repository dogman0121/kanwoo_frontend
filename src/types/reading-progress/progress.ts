export type Progress = {
    id: number,
    page: number,
    status: "not_started" | "reading" | "finished",
    created_at: string
}