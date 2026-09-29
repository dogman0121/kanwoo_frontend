import { createEntityAdapter } from "@reduxjs/toolkit";
import { PostBlock } from "./state";

export const postsAdapter = createEntityAdapter({
    selectId: (postBlock: PostBlock) => postBlock.id
})