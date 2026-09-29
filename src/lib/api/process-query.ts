import { ApiConfig } from "./api-config.type"
import { fetchApi, fetchManyApi } from "./fetchApi"
import { HTTP_METHODS } from "./methods.type"
import { Node } from "./node.type"
import { createNode, getRoute, insertRoute } from "./trie"
import {compile} from "path-to-regexp"

export const initApiConfig = (config: ApiConfig): Node => {
    const node = createNode()

    for (let path of Object.keys(config)) {
        insertRoute(node, path, config[path])
    }

    return node
}

export const processQuery = async (trie: Node, request: Request, resources: string[]) => {
    const { config, params} = getRoute(trie, resources)
    if (!config)
        throw new Error("Failed to get config")

    const method: HTTP_METHODS = HTTP_METHODS[request.method as keyof typeof HTTP_METHODS]
    const methodConfig = config[HTTP_METHODS[method]]
    if (!methodConfig)
        throw new Error("Method is not allowed")

    switch (methodConfig.mode) {
        case "proxy":
            if (!methodConfig.url)
                throw new Error("Failed to get url")

            const toPath = compile(methodConfig.url)
            return fetchApi(request, {url: toPath(params), method: methodConfig.method})
        case "aggregate":
            if (!methodConfig.urls)
                throw new Error("Failed to get urls")

            const aggrerageURLS = methodConfig.urls.map(url => {
                const toPath = compile(url.url)

                return {
                    url: toPath(params),
                    name: url.name
                }
            })
            return fetchManyApi(request, aggrerageURLS)
        case "transform":
            let transformedRequest = request
            if (methodConfig.transformRequest)
                transformedRequest = await methodConfig.transformRequest(request, params)

            const response = await fetchApi(transformedRequest, {method: methodConfig.method})

            let transformedResponse = response;
            if (methodConfig.transformResponse)
                transformedResponse = await methodConfig.transformResponse(response)

            return transformedResponse
    }


}