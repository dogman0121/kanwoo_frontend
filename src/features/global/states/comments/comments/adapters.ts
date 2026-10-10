import { createEntityAdapter } from "@reduxjs/toolkit";
import { CommentBlock } from "./state";

export const commentsAdapter = createEntityAdapter({
    selectId: (comment: CommentBlock) => comment.comment.id
})

