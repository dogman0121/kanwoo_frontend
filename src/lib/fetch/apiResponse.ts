export type SuccessResponse<T> = {
    data: T,
    metadata: Record<string, unknown>
}

export type ErrorResponse = {
    error: {
        code: string,
        detail: Record<string, string[]>
    }
}

export class ApiError extends Error {
    code: string
    detail: Record<string, string[]>

    constructor(code: string, detail: Record<string, string[]>) {
        super(`ApiError! Error code: ${code}.`);
        this.name = "ApiError"
        this.code = code
        this.detail = detail
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse