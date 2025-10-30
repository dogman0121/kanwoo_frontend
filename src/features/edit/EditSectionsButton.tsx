import { ListItemButton, ListItemButtonProps, styled } from "@mui/material";
import Link from "next/link";

const EditSectionsButton = styled(ListItemButton)(({theme}) =>({
    borderRadius: "12px",
    "&.Mui-selected": {
        backgroundColor: theme.vars?.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.vars?.palette.secondary.main
        }
    }
}))

export default EditSectionsButton;