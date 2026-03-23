import { useState } from "react"
import AuthInput from "./AuthInput"
import { Badge, FormControl, FormControlProps, FormHelperText, Icon, IconButton, InputLabel, OutlinedInput, TextFieldProps, Tooltip } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

export default function AuthPasswordInput({helperText, ...props}: FormControlProps & {helperText?: string}) {
    const [passwordShown, setPasswordShown] = useState(false)
    
    return (
        <FormControl {...props}>
            <InputLabel>Пароль</InputLabel>
            <OutlinedInput
                label="Пароль"
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
            />
            {helperText && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    )
}