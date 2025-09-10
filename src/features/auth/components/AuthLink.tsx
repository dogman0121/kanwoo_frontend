import { styled, Typography } from "@mui/material";

const AuthLink = styled(Typography)(({theme}) => ({
    color: theme.vars?.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
        textDecoration: "underline"
    }
}))

export default AuthLink;