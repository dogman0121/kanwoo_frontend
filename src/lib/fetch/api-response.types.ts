export type PagePagination = {
    page: number,
    per_page: number,
    total_count: number
}

export type CursorPagination = {
    cursor: Record<string, unknown>,
    limit: number,
    has_more: boolean
}

export type Pagination = CursorPagination | PagePagination

export type SuccessResponse<D, M, C, PAG, PERM> = {
    data: D,
    metadata: M,
    pagination: PAG,
    context: C,
    permission: PERM
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

export type ApiResponse<
    DATA, 
    METADATA=Record<string, unknown>, 
    CONTEXT=Record<string, unknown>,
    PAGINATION=Pagination,
    PERMISSION=Record<string, unknown>
> = SuccessResponse<DATA, METADATA, CONTEXT, PAGINATION, PERMISSION> | ErrorResponse