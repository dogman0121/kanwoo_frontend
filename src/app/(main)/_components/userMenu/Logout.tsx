"use client"

import { clientFetch } from "@/lib/fetch/clientFetch";
import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice";
import { useAppDispatch } from "@/lib/state/hooks";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function Logout() {
    const dispatch = useAppDispatch()

    const handleLogout = async() => {
        await clientFetch.post("/auth/logout");

        dispatch(setAuthProfile(null))
    }
    return (
        <MenuItem
            onClick={handleLogout}
        >
            <ListItemIcon>
                <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText>
                Выйти
            </ListItemText>
        </MenuItem>
    )
}