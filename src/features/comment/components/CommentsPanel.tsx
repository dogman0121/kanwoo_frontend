import BottomPanel, { BottomPanelBody, BottomPanelHeader } from "@/components/BottomPanel"
import { COMMENTS_DRAWER_WIDTH } from "@/constants/chapter-page"
import CommentInput from "@/features/comment/components/ui/CommentInput"
import CommentsList from "@/features/comment/components/CommentsList"
import NoComments from "@/features/comment/components/NoComments"
import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { Box, Divider, Drawer, IconButton, Paper, Typography } from "@mui/material"
import { selectCommentBlockById, selectInputOpen, selectReplyContext } from "@/features/comment/states/comments/selectors"
import { addReply, closeInput, openInput, setInputContext, setReplyInputOpen } from "@/features/comment/states/comments/slice"
import ThreadComment from "./ThreadComment"

export interface CommentsPanelProps {
    commentsIds: number[],
    open: boolean,
    hasMore: boolean,
    onClose?: () => void,
    onOpen?: () => void,
    onLoad?: () => void,
    onSendComment?: (text: string, parentId?: number) => void
    
}

export default function CommentsPanel({
    open,
    commentsIds,
    hasMore,
    onLoad,
    onSendComment,
    onOpen,
    onClose
}: CommentsPanelProps) {
    const dispatch = useAppDispatch()

    const deviceType = useAppSelector(selectDeviceType)
    const replyContext = useAppSelector(selectReplyContext)
    const inputOpen = useAppSelector(selectInputOpen)

    const replyComment = useAppSelector((state) => {
        if (!replyContext.commentId)
            return null
        
        return selectCommentBlockById(state, replyContext.commentId)
    })

    const handleAddComment = (text: string) => {
        const { parentCommentId} = replyContext
        if (replyComment) {
            dispatch(addReply({
                parentCommentId: parentCommentId, 
                comment: replyComment.comment.data, 
                text: text
            }))
        } else {
            onSendComment?.(text)
        }

        dispatch(setInputContext({parentCommentId: null, commentId: null}))
    }

    const handleLoad = () => {
        if (!open)
            return

        onLoad?.()
    }

    const inner = (
        <>
            <BottomPanelHeader
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                Комментарии
                <IconButton onClick={onClose}>
                    <CloseRoundedIcon />
                </IconButton>
            </BottomPanelHeader>
            <BottomPanelBody
                sx={{
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    height: "100%",
                    width: "100vw",

                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }}
            >
                {!hasMore && commentsIds.length == 0 ?
                    <NoComments />
                    :
                    <CommentsList 
                        commentsLength={commentsIds.length}
                        hasMore={hasMore}
                        onNext={handleLoad}
                    >
                        {commentsIds.map(commentId => (
                            <ThreadComment 
                                threadId={commentId}
                                key={`comment_list_${commentId}`}
                                disableReplyInput
                            />
                        ))}
                    </CommentsList>
                }
            </BottomPanelBody>
            {replyComment && (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: "0",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px"
                    }}
                >
                    <BottomPanelBody
                        sx={{
                            py: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            Ответ для {replyComment.comment.data.creator.name}
                        </Box>
                        <IconButton 
                            size="small" 
                            onClick={() => dispatch(setInputContext({parentCommentId: null, commentId: null}))}
                        >
                            <CloseRoundedIcon 
                                sx={{
                                    fontSize: "20px"
                                }}
                            />
                        </IconButton>
                        
                    </BottomPanelBody>
                </Paper>
            )}
            <BottomPanelBody
                sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    position: "sticky",
                    bottom: 0
                }}
            >
                <CommentInput 
                    size="small" 
                    onSend={handleAddComment}
                    onOpen={() => dispatch(openInput({
                        parentCommentId: null, 
                        commentId: null
                    }))}
                    onClose={() => dispatch(closeInput())}
                    open={inputOpen}
                />
            </BottomPanelBody>
        </>
    )


    return (
        <>
            {deviceType == "mobile" ?
                <BottomPanel
                    open={open}
                    onOpen={onOpen}
                    onClose={onClose}
                    sx={{
                        height: "65%",
                        maxWidth: "100vw",
                        overflow: "hidden"
                    }}
                >
                   {inner}
                </BottomPanel>
                :
                <Drawer
                    open={open}
                    variant="persistent"
                    onClose={onClose}
                    slotProps={{
                        paper: {
                            elevation: 1
                        }
                    }}
                    anchor="right"
                    sx={{
                        "&>.MuiPaper-root": {
                            width: `${COMMENTS_DRAWER_WIDTH}px`,
                            height: "100%"
                        }
                    }}
                >
                    {inner}
                </Drawer>
            }
        </>
    )
}