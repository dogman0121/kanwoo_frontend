import { styled, TextField } from "@mui/material";

const Input = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: "12px",
    },
}))

export default Input;