import EditInput from "@/features/edit/components/EditInput";
import { Box, InputAdornment, TextFieldProps, Typography } from "@mui/material";

export default function ProfileAbout({value, ...props}: TextFieldProps) {
    return (
        <EditInput
            label={"Описание команды<"}
            caption={"Помогает читателям узнать о команде побольше. Лучше не прикреплять контактную информацию."}
            placeholder="Введите описание"
            minRows={5}
            multiline
            sx={{
                "& .MuiOutlinedInput-root": {
                    flexDirection: "column",
                    p: "10px 14px 5px"
                }
            }}
            slotProps={{
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
            }}
            value={value || ""}
            {...props}
        />
    )
}