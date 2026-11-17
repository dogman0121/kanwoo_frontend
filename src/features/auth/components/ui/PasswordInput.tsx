import { useState } from "react"
import AuthInput from "./Input"
import { Badge, FormControl, FormControlProps, FormHelperText, Icon, IconButton, InputLabel, OutlinedInput, OutlinedInputProps, TextFieldProps, Tooltip } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

export default function PasswordInput({helperText, label = "Пароль", error, ...props}: OutlinedInputProps & {helperText?: string}) {
    const [passwordShown, setPasswordShown] = useState(false)
    
    return (
        <FormControl error={error}>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                label={label}
                placeholder="Введите парооль"
                type={passwordShown ? "text" : "password"} 
                endAdornment={
                    <>
                        {passwordShown ?
                            <Tooltip title="Скрыть">
                                <IconButton
                                    onClick={() => setPasswordShown(false)}
                                >
                                    <VisibilityOffIcon />
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Показать">
                                <IconButton
                                    onClick={() => setPasswordShown(true)}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </>
                }
                sx={{
                    borderRadius: "12px"
                }}
                {...props}
            />
            {helperText && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    )
}