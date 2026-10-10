import { Box, Button, styled, Theme } from "@mui/material";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export enum MoreButtonState {
    HIDDEN,
    OPEN_PARTICULARLY,
    OPEN_FULL
}


const MoreButtonContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "depth"
})<{depth: number}>(({theme}) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
}))


const getButtonLineStyles = (theme: Theme) => ({
    content: "''",
    position: "absolute",
    top: "0", 
    height: "27px",
    borderLeft: "1px solid",
    borderBottom: "1px solid",
    borderColor: theme.vars?.palette.divider,
    
    /* Скругляем именно левый нижний угол */
    borderBottomLeftRadius: "16px", 
})

const MoreButtonLine = styled(Box, {
    shouldForwardProp: (prop) => prop !== "depth"
})<{depth: number}>(({theme}) => ({
    variants: [
        {
            props: {depth: 1},
            style: () => ({
                width: "36px",

                "&::before": {
                    ...getButtonLineStyles(theme),
                    
                    left: "18px",    
                    width: "19px",
                }
            })
        },
        {
            props: {depth: 2},
            style: () => ({
                width: "30px",

                "&::before": {
                    ...getButtonLineStyles(theme),
                    
                    left: "15px",    
                    width: "16px",
                }
            })
        }
    ]
}))

export default function CommentMoreButton({
    depth,
    repliesCount,
    state,
    onShow,
    onHidden,
    onMore
}: {
    depth: number,
    repliesCount: number,
    state: MoreButtonState,
    onShow?: () => void,
    onHidden?: () => void,
    onMore?: () => void
}) {
    return (
        <MoreButtonContainer depth={depth}>
            <MoreButtonLine depth={depth}/>
            <Button
                className="more-button"
                variant="contained"
                color="inherit"
                startIcon={
                    <>
                        {state == MoreButtonState.OPEN_FULL && (
                            <KeyboardArrowUpRoundedIcon />
                        )}
                        {state != MoreButtonState.OPEN_FULL && (
                            <KeyboardArrowDownRoundedIcon />
                        )}
                    </>
                }
                onClick={() => {
                    if (state == MoreButtonState.HIDDEN) {
                        onShow?.()
                    } else if (state == MoreButtonState.OPEN_PARTICULARLY) {
                        onMore?.()
                    } else if (state == MoreButtonState.OPEN_FULL) {
                        onHidden?.()
                    }
                }}
                sx={[
                    (theme) => ({   
                        fontWeight: 600,
                        mt: 2,
                        height: "34px",

                        bgcolor: "transparent",
                        "&:hover": {
                            backgroundColor: theme.palette.grey[300]
                        }
                    }),
                    (theme) => theme.applyStyles("dark", {
                        "&:hover": {
                            backgroundColor: theme.palette.grey[800]
                        }
                    })
                ]}
            >
                {state == MoreButtonState.HIDDEN && (
                    <>
                        {repliesCount} ответов
                    </>
                )}
                {state == MoreButtonState.OPEN_FULL && (
                    <>
                        Скрыть ответы
                    </>
                )}
                {state == MoreButtonState.OPEN_PARTICULARLY && (
                    <>
                        Показать еще
                    </>
                )}
            </Button>
        </MoreButtonContainer>
    )
}