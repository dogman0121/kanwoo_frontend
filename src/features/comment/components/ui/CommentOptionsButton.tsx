import { IconButton, SvgIcon } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CommentOptionsButton() {
    return (
        <>
            <IconButton
                size="small"
                sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,

                    mt: "-6px"
                }}
            >
                <SvgIcon fontSize="medium">
                    <MoreVertIcon />
                </SvgIcon>
            </IconButton>
        </>
    )
}