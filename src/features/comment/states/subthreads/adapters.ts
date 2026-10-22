import { createEntityAdapter } from "@reduxjs/toolkit";
import { SubthreadBlock } from "./state";

export const subthreadsAdapter = createEntityAdapter({
    selectId: (subthread: SubthreadBlock) => subthread.rootCommentId
})

