
export enum HTTP_METHODS {
    POST = "POST",
    GET = "GET",
    PATCH = "PATCH",
    DELETE = "DELETE",
    PUT = "PUT",
    HEAD = "HEAD"
} 

export interface RequestApiSchema {
    name: string
    url: string
    method: HTTP_METHODS
}

export async function fetchApi(request: Request, url: string, method: HTTP_METHODS) {
    let body;

    if (method != HTTP_METHODS.GET && method != HTTP_METHODS.HEAD){
        body = await request.clone().arrayBuffer()
    }

    const proxyURL = process.env.API_URL + url
    const proxyRequest = new Request(proxyURL, {
        headers: request.headers,
        body: body,
        method: method
    })

    return await fetch(proxyRequest)
}

export async function fetchManyApi(request: Request, requests: RequestApiSchema[]) {
    const [...apiResponses] = await Promise.all(requests.map((req) => fetchApi(request, req.url, req.method)))

    const responseJSON: {
        data: Record<string, unknown>
        meta: Record<string, unknown>
        error: Record<string, unknown>
    } = { data: {}, meta: {}, error: {} }

    for (let i = 0; i < apiResponses.length; i++) {
        const responseName = requests[i].name
        const response = apiResponses[i]

        const apiJSON = await response.json()

        responseJSON.data[responseName] = apiJSON?.data
        responseJSON.meta[responseName] = apiJSON?.meta
        responseJSON.error[responseName] = apiJSON?.error
    }

    return new Response(JSON.stringify(responseJSON), {
        status: 200,
    })
}
