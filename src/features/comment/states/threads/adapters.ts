import { createEntityAdapter } from "@reduxjs/toolkit";
import { ThreadBlock } from "./state";

export const threadAdapter = createEntityAdapter({
    selectId: (thread: ThreadBlock) => thread.rootCommentId
})

