import BottomPanel, { BottomPanelBody, BottomPanelHeader } from "@/components/BottomPanel"
import { COMMENTS_DRAWER_WIDTH } from "@/constants/chapter-page"
import CommentItem from "@/features/comment/components/Comment"
import CommentInput from "@/features/comment/components/CommentInput"
import CommentsList from "@/features/comment/components/CommentsList"
import NoComments from "@/features/comment/components/NoComments"
import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Chapter } from "@/types/chapter"
import { Comment } from "@/types/comment"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { Box, Divider, Drawer, IconButton, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export interface CommentsPanelProps {
    commentsIds: number[],
    open: boolean,
    hasMore: boolean,
    onClose?: () => void,
    onLoad?: () => void,
    onSendComment?: (text: string, parentId?: number) => void
    
}

export default function CommentsPanel({
    open,
    commentsIds,
    hasMore,
    onLoad,
    onSendComment,
    onClose
}: CommentsPanelProps) {
    const deviceType = useAppSelector(selectDeviceType)

    const [replyComment, setReplyComment] = useState<Comment | null>(null)

    const handleAddComment = (text: string) => {
        onSendComment?.(text, replyComment?.id)

        setReplyComment(null)
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
                        onNext={onLoad}
                    >
                        {commentsIds.map(commentId => (
                            <CommentItem 
                                commentId={commentId}
                                key={`comment_list_${commentId}`}
                                onReply={(comment: Comment) => {setReplyComment(comment)}}
                            />
                        ))}
                    </CommentsList>
                }
            </BottomPanelBody>
            {replyComment && (
                <Paper
                    sx={{
                        borderRadius: "0",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px"
                    }}
                >
                    <BottomPanelBody
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            Ответ для {replyComment.creator.name}
                        </Box>
                        <IconButton 
                            size="small" 
                            onClick={() => setReplyComment(null)}
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
            <Divider />
            <BottomPanelBody
                sx={{
                    position: "sticky",
                    bottom: 0
                }}
            >
                <CommentInput size="small" onSend={handleAddComment}/>
            </BottomPanelBody>
        </>
    )


    return (
        <>
            {deviceType == "mobile" ?
                <BottomPanel
                    open={open}
                    onClose={onClose}
                    sx={{
                        height: "65%",
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