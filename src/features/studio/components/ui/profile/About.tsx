import EditInput from "@/components/edit/Input";
import { Box, InputAdornment, TextFieldProps, Typography } from "@mui/material";

export default function ProfileAbout({value, ...props}: TextFieldProps) {
    return (
        <EditInput
            label={"Описание"}
            caption={"Помогает читателям узнать о профиле побольше. Лучше не прикреплять контактную информацию."}
            inputProps={{
                placeholder: "Введите описание",
                value: value,
                minRows: 5,
                multiline: true,
                sx: {
                    "& .MuiOutlinedInput-root": {
                        flexDirection: 'column',
                        p: '10px 14px 5px'
                    }
                },
                slotProps: {
                    input: {
                        endAdornment: 
                            <InputAdornment position="end"
                                sx={{
                                    alignSelf: "end"
                                }}
                            >
                                <Typography
                                    variant="caption"
                                >
                                    {(value as string).length}/1000
                                </Typography>
                            </InputAdornment>
                    }
                },
                ...props
            }}
        />
    )
}