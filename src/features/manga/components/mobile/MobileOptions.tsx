"use client"

import AppBackdrop, { AppBackdropProps } from "@/components/AppBackdrop";
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded"
import ReportRoundedIcon from "@mui/icons-material/ReportRounded"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectManga } from "@/features/manga/states/manga-page/page/slice";
import { openReportDialog, openShareBackdrop } from "@/features/global/states/app/slice";

export default function MobileOptions({open, onClose}: AppBackdropProps) {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

    const handleReport = () => {
        if (!manga) return

        dispatch(openReportDialog({type: "manga", entityID: manga.data.slug}))
    }

    if (!manga) return

    return (
        <>
            <AppBackdrop
                open={open}
                onClose={onClose}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => dispatch(openShareBackdrop(`/manga/${manga.data.slug}`))}
                        >
                            <ListItemIcon>
                                <ShareRoundedIcon color="action" />
                            </ListItemIcon>
                            <ListItemText primary="Поделиться" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleReport}
                        >
                            <ListItemIcon>
                                <ReportRoundedIcon color="action"/>
                            </ListItemIcon>
                            <ListItemText primary="Пожаловаться" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </AppBackdrop>
        </>
    )
}