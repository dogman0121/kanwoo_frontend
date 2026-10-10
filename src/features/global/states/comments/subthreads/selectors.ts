import { subthreadsAdapter } from "./adapters";
import { RootState } from "./state";

export const {
    selectById: selectSubthreadBlockById
} = subthreadsAdapter.getSelectors((state: RootState) => state.global.comments.subthreads)