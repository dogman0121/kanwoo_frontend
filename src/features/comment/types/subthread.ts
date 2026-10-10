import { CursorPagination } from "@/lib/fetch/api-response.types";
import { Comment } from "./comment.type";
import { DiscussionComment } from "./discussion-comment.type";
import { CommentContext } from ".";

export type Subthread = {
    root_comment: Comment,
    discussion: DiscussionComment[],
    discussion_pagination: CursorPagination
}


export type SubthreadContext = {
    root_comment: CommentContext,
    discussion: CommentContext[]
}