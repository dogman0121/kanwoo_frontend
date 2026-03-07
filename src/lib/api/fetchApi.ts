
export enum HTTP_METHODS {
    POST = "POST",
    GET = "GET",
    PATCH = "PATCH",
    DELETE = "DELETE",
    PUT = "PUT"
} 

export interface RequestApiSchema {
    name: string
    url: string
    method: HTTP_METHODS
}

export async function fetchApi(request: Request, url: string, method: HTTP_METHODS) {

    const proxyURL = process.env.NEXT_PUBLIC_API_URL + url
    const proxyRequest = new Request(proxyURL, {
        ...request,
        method: method
    })

    const res = await fetch(proxyRequest)
    console.log('Status:', res.status, res.statusText);

    return res
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
        const apiJSON = await apiResponses[i].json()

        responseJSON.data[responseName] = apiJSON.data
        responseJSON.meta[responseName] = apiJSON.meta
        responseJSON.error[responseName] = apiJSON.error
    }

    return new Response(JSON.stringify(responseJSON), {
        status: 200,
    })
}
