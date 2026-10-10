import { IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CommentOptionsButton() {
    return (
        <>
            <IconButton
                size="small"
                sx={{
                    position: "absolute",
                    right: "-5px",
                    top: "-5px"
                }}
            >
                <MoreVertIcon />
            </IconButton>
        </>
    )
}