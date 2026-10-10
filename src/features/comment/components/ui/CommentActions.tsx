import { Box, IconButton, styled, SvgIcon, Tooltip, Typography, useTheme } from "@mui/material"
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export interface CommentActionsProps {
    onVoteUp: () => void,
    onVoteDown: () => void,
    userVote: number | null,
    votes: number,
    onClickReplyButton: () => void
}

const FavouriteOutlinedIcon = () => {
    return (
        <SvgIcon fontSize="small">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="-80 -80 560.00 560.00"
                fill="currentColor"
            >
                <g transform="translate(0,-652.36216)">
                    <path
                        style={{
                            fill: "inherit",
                            fillRule: "evenodd",
                            stroke: "none",
                            strokeWidth: "1px",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeOpacity: 1,
                        }}
                        d="m 302.93981,652.38173 c -63.032,-1.5591 -101.8272,89.0478 -102.543,90.7324 -0.7118,-1.6752 -39.3769,-91.9795 -102.263695,-90.7266 -11.7545,0.2341 -24.3533,3.6708 -37.705,11.4922 -103.624,60.7034 -84.4523,232.33335 139.886695,388.38877 l 0,0.094 c 0.027,-0.016 0.052,-0.033 0.08,-0.049 0.027,0.016 0.053,0.033 0.08,0.049 l 0,-0.094 c 221.3186,-145.95392 243.5128,-327.68537 139.8887,-388.38877 -13.247,-7.7601 -25.7512,-11.2093 -37.4238,-11.498 z m -203.708995,24.2304 c 14.244095,0.2292 28.245695,6.7112 37.992195,17.2852 33.4958,29.8827 47.85,74.1361 64.3203,114.6133 9.9411,-30.1888 20.4285,-60.7062 38.3984,-87.2617 13.7816,-20.1435 31.7867,-40.8512 57.3262,-44.4942 30.1678,-0.5571 55.9912,22.213 68.4063,48.3965 18.3399,40.2679 9.7945,87 -8.0586,125.7852 -33.6267,71.51805 -92.5918,127.70345 -156.8594,172.11917 -20.3904,-14.8175 -40.1209,-30.53332 -58.8086,-47.43372 -41.4501,-37.9738 -79.441295,-81.4981 -101.996095,-133.51755 -9.8636,-24.0118 -17.0615,-50.0368 -16.2148,-76.2539 1.9232,-37.416 25.5138,-74.6185 61.3183,-87.3027 4.6532,-1.3936 9.4278,-2.012 14.1758,-1.9356 z"
                    />
                </g>
            </svg>
        </SvgIcon>
    );
};


const FavouriteFilledIcon = () => {
    return (
        <SvgIcon fontSize="small">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="-80 -80 560.00 560.00"
                fill="currentColor"
            >
                <g transform="translate(0,-652.36216)">
                    <path
                        style={{
                            fill: "inherit",
                            fillRule: "evenodd",
                            stroke: "none",
                            strokeWidth: "1px",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeOpacity: 1,
                        }}
                        d="m 98.133214,652.38729 c -11.7545,0.2341 -24.353,3.6716 -37.7047,11.493 -103.624,60.7034 -84.4526,232.3336 139.886396,388.38891 l 0,0.093 c 0.027,-0.016 0.053,-0.032 0.081,-0.048 0.027,0.016 0.052,0.032 0.079,0.048 l 0,-0.093 c 221.3186,-145.95385 243.5122,-327.68551 139.8881,-388.38891 -84.7806,-49.6647 -139.1183,77.2371 -139.9667,79.2336 -0.7118,-1.6752 -39.3752,-91.9795 -102.261996,-90.7266 z"
                    />
                </g>
            </svg>
        </SvgIcon>
    );
};

const VoteAction = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "selected"
})<{selected?: boolean}>(({theme}) => ({
    width: 32,
    height: 32,
    padding: 4,

    variants: [
        {
            props: {selected: true},
            style: () => ({
                
            })
        }
    ]
}))

export default function CommentActions({
    onVoteUp,
    onVoteDown,
    onClickReplyButton,
    userVote,
    votes
}: CommentActionsProps) {
    return (
        <Box
            sx={{
                mt: 0.4,
                ml: -1,

                display: "flex",
                gap: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Tooltip title="Нравится">
                    <VoteAction 
                        size="small" onClick={onVoteUp}
                    >
                        {userVote == 1 ?
                            <FavouriteFilledIcon />
                            :
                            <FavouriteOutlinedIcon />
                        }
                    </VoteAction>
                </Tooltip>
                <Typography color="textSecondary" variant="caption">
                    {votes}
                </Typography>
            </Box>
            <Tooltip title="Не нравится">
                <VoteAction 
                    size="small" 
                    onClick={onVoteDown} 
                >
                    <SvgIcon fontSize="small">
                        {userVote == -1 ?
                            <ThumbDownAltIcon/>
                            :
                            <ThumbDownAltOutlinedIcon/>
                        }
                    </SvgIcon>
                </VoteAction>
            </Tooltip>
            <Tooltip title="Ответить">
                <VoteAction size="small" onClick={onClickReplyButton}>
                    <ReplyRoundedIcon />
                </VoteAction>
            </Tooltip>
        </Box>
    )
}