import { styled, TextField } from "@mui/material";

const AuthInput = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: "12px",
    },
}))

export default AuthInput;