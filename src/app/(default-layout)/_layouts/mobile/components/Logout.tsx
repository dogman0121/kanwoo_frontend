"use client"

import { clientFetch } from "@/lib/fetch/client-fetch.util";
import { useAppDispatch } from "@/lib/state/hooks";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { setAuthProfile } from "@/features/global/states/auth-profile/auth-profile.slice";

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