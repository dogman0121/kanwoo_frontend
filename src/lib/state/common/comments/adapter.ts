import { createEntityAdapter } from "@reduxjs/toolkit";
import { CommentsBlock } from "./state";

export function makeEntityAdapter() {
    const entityAdapter = createEntityAdapter({
        selectId: (commentBlock: CommentsBlock) => commentBlock.entityId
    })

    return entityAdapter
} 