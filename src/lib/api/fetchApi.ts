export interface RequestApiSchema {
    name: string,
    url: string,
    options?: RequestInit
}

export async function fetchApi(request: Request, url: string, options?: RequestInit) {
    const headers = new Headers(request.headers)

    if (options?.headers){
        const optionHeaders = new Headers(options.headers)
        optionHeaders.forEach((val, key) => {
            headers.set(key, val)
        })
    }

    const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        ...options,
        headers: headers,
        duplex: "half"
    })

    const response = new Response(apiResponse.body, {
        headers: apiResponse.headers,
        status: apiResponse.status,
    });

    return response
}

export async function fetchManyApi(request: Request, requests: RequestApiSchema[]) {
    const [...apiResponses] = await Promise.all(
        requests.map(req => fetchApi(request, req.url, req.options))
    )

    const responseJSON: {
        data: Record<string, unknown>,
        meta: Record<string, unknown>,
        error: Record<string, unknown>
    } = {data: {}, meta: {}, error: {}}
    
    for (let i=0; i<apiResponses.length; i++) {
        const responseName = requests[i].name
        const apiJSON = await apiResponses[i].json()

        responseJSON.data[responseName] = apiJSON.data;
        responseJSON.meta[responseName] = apiJSON.meta
        responseJSON.error[responseName] = apiJSON.error
    }

    return new Response(
        JSON.stringify(responseJSON),
        {
            status: 200,
        }
    )
}