import { Box, styled } from "@mui/material";

const AfterCommonStyles = {
    content: '""',
    position: "absolute",
    top: "5px",
    bottom: "0",
    width: "1px",
}

const CommentRootLine = styled(Box, {
    shouldForwardProp: (prop) => prop !== "depth"
})<{
    depth: number
}>(({theme}) => (
    {
        position: "absolute",
        bottom: "0",

        variants: [
            {
                props: {depth: 1},
                style: () => ({
                    height: "calc(100% - 36px)",
                    width: "36px",

                    "&::after": {
                        ...AfterCommonStyles,

                        backgroundColor: theme.vars?.palette.divider,
                        left: "18px",
                    }
                })
            },
            {
                props: {depth: 2},
                style: () => ({
                    height: "calc(100% - 30px)",
                    width: "30px",

                    "&::after": {
                        ...AfterCommonStyles,

                        backgroundColor: theme.vars?.palette.divider,
                        left: "15px",
                    }
                })
            }
        ]
    }
))

export default CommentRootLine