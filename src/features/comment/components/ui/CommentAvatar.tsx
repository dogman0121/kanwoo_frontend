import { Avatar, styled } from "@mui/material";

const CommentAvatar = styled(Avatar, {
    shouldForwardProp: (prop) => prop !== 'depth'
})<{depth: number}>(() => ({
    width: '26px',
    height: '26px',

    variants: [
        {
            props: {depth: 1},
            style: () => ({
                width: '36px',
                height: '36px'
            })
        },
        {
            props: {depth: 2},
            style: () => ({
                width: '30px',
                height: '30px'
            })
        },
    ]
}))

export default CommentAvatar