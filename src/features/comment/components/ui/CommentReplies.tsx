import { Box, styled } from "@mui/material";

const commentBeforeCommonStyles = {
    content: '""',

    position: 'absolute',
    top: "5px",
    bottom: "0",

    width: "1px",
    backgroundColor: "divider"
}

const commentAfterCommonStyles = {
    content: "''",
    position: "absolute",
    left: "-35px",    /* Начинается от вертикальной линии */
    top: "0px",      /* Высота, на которой линия поворачивает к аватарке/тексту */
    borderLeft: "1px solid",
    borderBottom: "1px solid",
    borderColor: "divider",
    
    /* Скругляем именно левый нижний угол */
    borderBottomLeftRadius: "16px", 
}

const moreButtonBeforeCommonStyles = {

}

const CommentReplies = styled(Box, {
    shouldForwardProp: (props) => props !== 'depth'
})<{depth: number}>(() => ({

    width: "100%",
    
    '& > .comment': {
        position: "relative",
        marginTop: "15px"
    },

    variants: [
        {
            props: {depth: 1},
            style: () => ({
            })
        },
        {
            props: {depth: 2},
            style: () => ({

                
            })
        },
    ]
}))

export default CommentReplies