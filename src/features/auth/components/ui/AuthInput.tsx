import { styled, TextField } from "@mui/material";

const AuthInput = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: "12px",
    },
}))

export default AuthInput;