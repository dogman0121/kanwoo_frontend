import { IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CommentOptionsButton() {
    return (
        <>
            <IconButton
                size="small"
                sx={{
                    position: "absolute",
                    p: 0
                }}
            >
                <MoreVertIcon />
            </IconButton>
        </>
    )
}