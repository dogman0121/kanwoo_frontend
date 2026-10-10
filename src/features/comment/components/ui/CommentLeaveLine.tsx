import { Box, styled, Theme } from "@mui/material";

const getVerticalLineCommonStyles = (theme: Theme) => ({
    content: '""',
    position: "absolute",
    top: "-15px",
    bottom: "0",
    backgroundColor: theme.vars?.palette.divider,
    width: "1px"
})

const getRoundedLineStyles = (theme: Theme) =>({
    content: "''",
    position: "absolute",
    top: "-15px", 
    borderLeft: "1px solid",
    borderBottom: "1px solid",
    borderColor: theme.vars?.palette.divider,

    /* Скругляем именно левый нижний угол */
    borderBottomLeftRadius: "16px", 
})

const CommentLeaveLine = styled(Box, {
    shouldForwardProp: (prop) => (prop !== "depth" && prop !== "isLast")
})<{
    depth: number,
    isLast: boolean
}>(({theme}) => (
    {
        variants: [
            {
                props: {depth: 2},
                style: () => ({
                    minWidth: "36px",

                    "&::after": {
                        ...getRoundedLineStyles(theme),

                        height: "33px",
                        width: "19px",
                        left: "18px",
                    }
                })
            },
            {
                props: {depth: 3},
                style: () => ({
                    minWidth: "30px",

                    "&::after": {
                        ...getRoundedLineStyles(theme),

                        height: "26px",
                        width: "16px",
                        left: "15px",
                    }
                })
            },
            {
                props: {depth: 2, isLast: false},
                style: ({theme}) => ({
                    "&::before": {
                        ...getVerticalLineCommonStyles(theme),

                        left: "18px",
                    }
                })
            },
            {
                props: {depth: 3, isLast: false},
                style: ({theme}) => ({
                    "&::before": {
                        ...getVerticalLineCommonStyles(theme),

                        left: "15px",
                    }
                })
            }
        ]
    }
))

export default CommentLeaveLine;