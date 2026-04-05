"use client"

import AppBackdrop, { AppBackdropProps } from "@/components/AppBackdrop";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded"
import ReportRoundedIcon from "@mui/icons-material/ReportRounded"
import { useState } from "react";
import { ShareMobile } from "@/components/Share";
import { useAppSelector } from "@/lib/state/hooks";
import ReportDialog from "@/components/ReportDialog";
import { mangaService } from "../_services/mangaService";

export default function MobileOptions({open, onClose}: AppBackdropProps) {
    const manga = useAppSelector(state => state.mangaPage.manga)

    const [shareOpen, setShareOpen] = useState(false);

    const [reportDialogOpen, setReportDialogOpen] = useState(false)

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
                        onClick={() => setReportDialogOpen(true)}
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
            <ReportDialog
                open={reportDialogOpen}
                onClose={() => setReportDialogOpen(false)}
                onSend={async (data) => {
                    await mangaService.reportManga(manga, data.reportType, data.comment)
                }}
            />
        </>
    )
}