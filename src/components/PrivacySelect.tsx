import { Box, FormControl, InputLabel, ListItemIcon, MenuItem, Select, SelectProps, Typography } from "@mui/material";
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';

export enum Privacy{
    PUBLIC = 1,
    PRIVATE = 2,
    LINK = 3
};


export default function PrivacySelect({...props}: SelectProps) {
    return (
        <FormControl fullWidth
            sx={{
                mt: "15px"
            }}
        >
            <InputLabel id="visibility-label">Доступ</InputLabel>
            <Select
                labelId="visibility-label"
                id="visibility-select"
                fullWidth
                label="Доступ"
                renderValue={(selected: unknown) => (
                    <Typography>
                        {selected == Privacy.PUBLIC && "Публичный"}
                        {selected == Privacy.LINK && "По ссылке"}
                        {selected == Privacy.PRIVATE && "Приватный"}
                    </Typography>
                )}
                {...props}
            >
                <MenuItem value={Privacy.PUBLIC}>
                    <ListItemIcon>
                        <PublicRoundedIcon />
                    </ListItemIcon>
                    <Box>
                        <Typography>Публичный</Typography>
                        <Typography variant="caption">Доступен всем пользователям</Typography>
                    </Box>
                </MenuItem>
                <MenuItem value={Privacy.LINK}>
                    <ListItemIcon>
                        <LinkRoundedIcon />
                    </ListItemIcon>
                    <Box>
                        <Typography>По ссылке</Typography>
                        <Typography variant="caption">Доступен тем, у кого есть ссылка</Typography>
                    </Box>
                </MenuItem>
                <MenuItem value={Privacy.PRIVATE}>
                    <ListItemIcon>
                        <LockRoundedIcon />
                    </ListItemIcon>
                    <Box>
                        <Typography>Приватный</Typography>
                        <Typography variant="caption">Доступен только вам</Typography>
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}