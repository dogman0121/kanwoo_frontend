import { RouteConfig } from "./api-config.type";
import { Node } from "./node.type";

export const createNode = (): Node => {
    return {
        static: new Map()
    }
}

export const insertRoute = (trie: Node, url: string, routeConfig: RouteConfig) => {
    if (!url.startsWith("/"))
        throw new Error("URL must be started from /")

    let currNode = trie;
    const resources = url.split("/").slice(1);

    for (let resource of resources) {
        if (resource == "")
            throw new Error("Resource can't be ''")

        if (resource.startsWith(":")) {
            if (!currNode.params) {
                const node = createNode()

                currNode.params = {
                    name: resource.slice(1),
                    node: node
                }
            }
            currNode = currNode.params.node
        } else {
            if (!currNode.static.has(resource)) {
                const node = createNode()

                currNode.static.set(resource, node)
            }
            currNode = currNode.static.get(resource)!
        }
    }
    currNode.endpoint = routeConfig
}

export const getRoute = (trie: Node, resources: string[]) => {
    let currNode = trie
    const params: Record<string, string> = {}

    for (let resource of resources) {
        let found = false;
        for (let i of currNode.static.keys()) {
            if (i == resource) {
                currNode = currNode.static.get(i)!
                found = true
                break
            }
        }
        if (found)
            continue

        if (!currNode.params)
            throw new Error("Params is not set")

        params[currNode.params.name] = resource
        currNode = currNode.params.node
    }

    return {
        config: currNode.endpoint,
        params: params,
    }
}