import { EntityAdapter, EntityState } from "@reduxjs/toolkit";
import { CommentsBlock } from "./state";

export function makeSelectors(
    adapter: EntityAdapter<CommentsBlock, string | number>, 
    selectState: (state: any) => EntityState<CommentsBlock, string | number>
) {
    const {
        selectAll: selectCommentsBlocks, 
        selectById: selectCommentsBlockById
    } = adapter.getSelectors(selectState)

    return {
        selectCommentsBlockById,
        selectCommentsBlocks
    }
}