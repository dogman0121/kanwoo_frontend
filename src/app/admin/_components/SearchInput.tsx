import { Box, Divider, FormControl, Input, InputProps } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

export default function SearchInput({...props}: InputProps) {
    return (
        <Box
            sx={{
                p: "10px 25px"
            }}
        >
            <FormControl
                fullWidth 
            >
                <Input
                    disableUnderline
                    placeholder="Введите запрос"
                    startAdornment={
                        <SearchRoundedIcon 
                            sx={{
                                marginRight: "10px",
                            }}
                        />
                    }
                    {...props}
                />
            </FormControl>
        </Box>
    )
}