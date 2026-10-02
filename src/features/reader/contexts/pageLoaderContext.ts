import { createContext } from "react";
import PageLoader from "../lib/page-loader";

export interface PageLoaderContextProps {
    loader?: PageLoader,
}

const pageLoaderContext = createContext<PageLoaderContextProps>({
})

export default pageLoaderContext;