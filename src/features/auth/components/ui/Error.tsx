import { styled, Typography } from "@mui/material";

const ErrorBlock = styled(Typography)(({theme}) => ({
    color: theme.vars?.palette.error.main,
    textAlign: "center"
}))

export default ErrorBlock;