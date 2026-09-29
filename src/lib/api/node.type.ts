import { RouteConfig } from "./api-config.type"

export type Node = {
    static: Map<string, Node>
    params?: {
        name: string,
        node: Node,
    },
    endpoint?: RouteConfig
}