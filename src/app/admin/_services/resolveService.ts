import { ResolveFilterType } from "../_components/ResolveFiltersGroup";

class ResolveService {
    compileParams(filters: ResolveFilterType) {
        const urlParams = new URLSearchParams()
        
        if (!(filters.resolved && filters.unresolved)) {
            if (filters.resolved)
                urlParams.append("resolved", "true")
            if (filters.unresolved)
                urlParams.append("resolved", "false")
        }

        return urlParams

    }
}

export const resolveService = new ResolveService()