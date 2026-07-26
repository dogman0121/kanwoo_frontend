import { ListItemIcon, ListItemText, MenuItem, Typography, useColorScheme } from "@mui/material"
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';

export default function ThemeSwitch() {
    const {mode, setMode} = useColorScheme()

    const handleSwitchTheme = () => {
        if (mode == "system")
            setMode("light")
        else if (mode == "light")
            setMode("dark")
        else
            setMode("system")
    }
    return (
        <MenuItem
            onClick={handleSwitchTheme}
        >
            <ListItemIcon>
                <ContrastRoundedIcon />
            </ListItemIcon>
            <ListItemText>
                Тема
            </ListItemText>
            <Typography variant="caption">
                {mode == "system" && "системная"}
                {mode == "dark" && "темная"}
                {mode == "light" && "светлая"}
            </Typography>
        </MenuItem>
    )
}