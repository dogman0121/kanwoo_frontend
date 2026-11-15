import { createContext } from "react";
import PageLoader from "../lib/page-loader";

export interface PageLoaderContextProps {
    pageLoader?: PageLoader,
}

const pageLoaderContext = createContext<PageLoaderContextProps>({
})

export default pageLoaderContext;