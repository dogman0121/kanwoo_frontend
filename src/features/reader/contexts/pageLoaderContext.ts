import { createContext } from "react";
import PageLoader from "../lib/pageLoader";

export interface PageLoaderContextProps {
    loader?: PageLoader,
}

const pageLoaderContext = createContext<PageLoaderContextProps>({
})

export default pageLoaderContext;