"use client"

import AppBackdrop, { AppBackdropProps } from "@/components/AppBackdrop";
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded"
import ReportRoundedIcon from "@mui/icons-material/ReportRounded"
import { useState } from "react";
import { ShareMobile } from "@/components/Share";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectManga } from "@/features/manga/states/manga-page/page/slice";
import { openReportDialog } from "@/features/global/states/app/slice";

export default function MobileOptions({open, onClose}: AppBackdropProps) {
    const dispatch = useAppDispatch()

    const manga = useAppSelector(selectManga)

    const [shareOpen, setShareOpen] = useState(false);

    const handleReport = () => {
        if (!manga) return

        dispatch(openReportDialog({type: "manga", entityID: manga.slug}))
    }

    if (!manga) return;

    return (
        <>
            <AppBackdrop
                open={open}
                onClose={onClose}
            >
                <List>
                    <ListItemButton
                        onClick={() => setShareOpen(true)}
                    >
                        <ListItemIcon>
                            <ShareRoundedIcon color="action" />
                        </ListItemIcon>
                        <ListItemText>
                            Поделиться
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton
                        onClick={handleReport}
                    >
                        <ListItemIcon>
                            <ReportRoundedIcon color="action"/>
                        </ListItemIcon>
                        <ListItemText>
                            Пожаловаться
                        </ListItemText>
                    </ListItemButton>
                </List>
            </AppBackdrop>
            <ShareMobile 
                open={shareOpen}
                onClose={() => setShareOpen(false)}
                link={`/manga/${manga.slug}`}
            />
        </>
    )
}