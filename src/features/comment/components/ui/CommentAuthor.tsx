import { Box, styled } from "@mui/material";

const baseStyles = {
    content: '""',
    position: 'absolute',
    bottom: '0',
                  
    width: '1px'
}

export const CommentAuthor = styled(Box, {
    shouldForwardProp: (prop) => (prop !== 'depth' && prop !== 'hasReplies')
})<{depth: number, hasReplies: boolean}>(() => ({
    variants: [
        {
            props: {depth: 1, hasReplies: true},
            style: () => ({
                "&::before": {
                    ...baseStyles,                    
                    left: '18px',
                    backgroundColor: "#FFF",
                    height: 'calc(100% - 40px - 5px)'
                }
            })
        },
        {
            props: {depth: 2, hasReplies: true},
            style: () => ({
                "&::before": {
                    ...baseStyles,
                    left: '15px',
                    backgroundColor: "#FFF",
                    height: 'calc(100% - 34px - 5px)'
                }
            })
        }
    ]
}))

export default CommentAuthor;