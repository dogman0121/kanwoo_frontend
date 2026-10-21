import { FormControl, InputLabel, MenuItem, Select, SelectProps, Typography } from "@mui/material";

export default function LanguageSelect({...props}: SelectProps) {
    return (
        <FormControl
            fullWidth
            sx={{
                mt: 3
            }}
        >
            <InputLabel id="language-label">Язык перевода</InputLabel>
            <Select
                labelId="language-label"
                fullWidth
                label="Язык перевода"
                renderValue={(selected: unknown) => (
                    <Typography>
                        {selected == "1" && "русский"}
                    </Typography>
                )}
                {...props}
            >
                <MenuItem value={1}>русский</MenuItem>
            </Select>
        </FormControl>
    )
}