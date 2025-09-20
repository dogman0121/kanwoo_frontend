import { Snackbar, Box, SnackbarCloseReason, Paper } from "@mui/material"
import { SyntheticEvent } from "react"
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function AppSnackbar({ 
        open, 
        onClose,
        variant,
        message
    }: 
    {
        open: boolean, 
        onClose: () => void,
        message: string,
        variant: "success" | "error"
    }){
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
            <Paper
                sx={{
                    p: "15px",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",

                    borderRadius: "10px",

                    boxShadow: 2
                }}
            >
                {variant === "error" && (
                    <ErrorIcon  color="error"/>
                )}
                {variant === "success" && (
                    <CheckCircleIcon  color="success"/>
                )}                
                <Box>
                    { message }
                </Box>
            </Paper>
        </Snackbar>
    )
}