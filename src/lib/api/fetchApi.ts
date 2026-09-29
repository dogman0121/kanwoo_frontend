import { AggregateURL } from "./api-config.type";
import { HTTP_METHODS } from "./methods.type";

export async function fetchApi(
    request: Request, 
    options: {
        url?: string,
        method?: HTTP_METHODS
    }
) {
    const requestURL = new URL(request.url)

    let pathName = options.url ?? requestURL.pathname

    const proxyURL = process.env.API_URL + pathName + "?" + requestURL.searchParams.toString()

    const proxyRequest = new Request(proxyURL, {
        headers: request.headers,
        method: options.method ?? request.method,
        body: request.body,
        duplex: "half"
    })

    return await fetch(proxyRequest)
}

export async function fetchManyApi(request: Request, requests: AggregateURL[]) {
    const [...apiResponses] = await Promise.all(requests.map((req) => (
        fetchApi(request, {url: req.url, method: req.method})
    )))

    const responseJSON: {
        data: Record<string, unknown>
        metadata: Record<string, unknown>
        error: Record<string, unknown>,
        pagination: Record<string, unknown>,
        context: Record<string, unknown>
    } = { data: {}, metadata: {}, error: {}, pagination: {}, context: {} }

    for (let i = 0; i < apiResponses.length; i++) {
        const responseName = requests[i].name
        const response = apiResponses[i]

        const apiJSON = await response.json()

        responseJSON.data[responseName] = apiJSON?.data
        responseJSON.metadata[responseName] = apiJSON?.metadata
        responseJSON.error[responseName] = apiJSON?.error
        responseJSON.context[responseName] = apiJSON?.context
        responseJSON.pagination[responseName] = apiJSON?.pagination
    }

    return new Response(JSON.stringify(responseJSON), {
        status: 200,
    })
}
