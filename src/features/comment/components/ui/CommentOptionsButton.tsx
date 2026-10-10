import { IconButton } from "@mui/material"
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
                    margin: "-4px"
                }}
            >
                <MoreVertIcon />
            </IconButton>
        </>
    )
}