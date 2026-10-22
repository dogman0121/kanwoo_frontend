import { threadAdapter } from "./adapters";
import { RootState } from "./state";

export const {
    selectById: selectThreadBlockById
} = threadAdapter.getSelectors((state: RootState) => state.comments.threads)

