import { styled, Typography } from "@mui/material";

const AuthError = styled(Typography)(({theme}) => ({
    color: theme.vars?.palette.error.main,
    textAlign: "center"
}))

export default AuthError;