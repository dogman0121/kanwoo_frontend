"use client"

import { AppBackdropProps } from "@/components/AppBackdrop";
import { setReadingSettingsAligment, setReadingSettingsAutoSave, setReadingSettingsInfinityChapter, setReadingSettingsPageNumbers } from "@/lib/state/features/readingSettings/readingSettingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Backdrop, Box, BoxProps, ListItemButton, ListItemIcon, ListItemText, Switch, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ChangeEvent, Children, MouseEvent, useState } from "react";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded"
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded"
import { ShareMobile } from "@/components/Share";
import ReportDialog from "@/components/ReportDialog";
import { mangaService } from "@/app/(main)/(with_footer)/manga/[mangaSlug]/_services/mangaService";
import { clientFetch } from "@/lib/fetch/clientFetch";

function BackdropBody({sx, ...props}: BoxProps) {
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: "16px",
                p: "20px",
                overflow: "hidden",

                ...sx
            }}
            {...props}
        />
    )
}

function SwitchSetting({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}

export default function ReadingSettings({open, onClose}: AppBackdropProps) {
    const dispatch = useAppDispatch()
    
    const settings = useAppSelector(state => state.readingSettings)

    const [shareOpen, setShareOpen] = useState(false);
    const [reportDialogOpen, setReportDialogOpen] = useState(false)

    const chapter = useAppSelector(state => state.chapterPage.currentChapter)

    if (!chapter)
        return
    
    return (
        <>
            <Backdrop
                open={open}
                onClick={onClose}
                sx={{
                    zIndex: 10
                }}
            >
                <Box
                    onClick={(event) => event.stopPropagation()}
                    sx={{
                        position: "absolute",
                        maxWidth: "600px",
                        width: "100%",
                        bottom: "0",
                        left: "50%",
                        transform: "translate(-50%)",
                        p: "10px",

                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <BackdropBody>
                        <Typography fontWeight={600} textAlign={"center"}>Настройки</Typography>
                        <Box
                            sx={{
                                mt: "15px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px"
                                }}
                            >
                                <Typography>Режим чтения</Typography>
                                <ToggleButtonGroup
                                    value={settings.aligment}
                                    exclusive
                                    onChange={(_event: MouseEvent<HTMLElement>, newAligment: string) => {
                                        if (newAligment)
                                            dispatch(setReadingSettingsAligment(newAligment))
                                    }}
                                    sx={{
                                        p: "5px",
                                        borderRadius: "12px",
                                        bgcolor: "#262626",
                                        width: "fit-content",
                                        ".MuiButtonBase-root": {
                                            border: "none",
                                            borderRadius: "10px",

                                            p: "2px 20px",

                                            textTransform: "none",
                                            fontWeight: 400
                                        }
                                    }}
                                >
                                    <ToggleButton 
                                        value={"auto"} key={"auto"}>Авто</ToggleButton>
                                    <ToggleButton value={"vertical"} key={"vertical"}>Вниз</ToggleButton>
                                    <ToggleButton value={"horizontal"} key={"horizontal"}>Вправо</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <SwitchSetting>
                                <Typography>
                                    Автосохранение
                                </Typography>
                                <Switch 
                                    checked={settings.autoSave}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        dispatch(setReadingSettingsAutoSave(event.target.checked))
                                    }}
                                />
                            </SwitchSetting>
                            <SwitchSetting>
                                <Typography>
                                    Показывать номера страниц
                                </Typography>
                                <Switch 
                                    checked={settings.pageNumbers}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        dispatch(setReadingSettingsPageNumbers(event.target.checked))
                                    }}
                                />
                            </SwitchSetting>
                            <SwitchSetting>
                                <Typography>
                                    Бесконечная глава
                                </Typography>
                                <Switch 
                                    checked={settings.infinityChapter}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        dispatch(setReadingSettingsInfinityChapter(event.target.checked))
                                    }}
                                />
                            </SwitchSetting>
                        </Box>
                    </BackdropBody>
                    <BackdropBody
                        sx={{
                            p: "0"
                        }}
                    >
                        <ListItemButton
                            onClick={() => setShareOpen(true)}
                            sx={{
                                p: "20px"
                            }}
                        >
                            <ListItemText>
                                Поделиться
                            </ListItemText>
                            <ReplyRoundedIcon />
                        </ListItemButton>
                    </BackdropBody>
                    <BackdropBody
                        sx={{
                            p: "0"
                        }}
                    >
                        <ListItemButton
                            sx={{
                                p: "20px"
                            }}
                            onClick={() => setReportDialogOpen(true)}
                        >
                            <ListItemText>
                                Пожаловаться
                            </ListItemText>
                            <ReportRoundedIcon />
                        </ListItemButton>
                    </BackdropBody>
                </Box>
            </Backdrop>
            <ShareMobile 
                link={`/chapters/${chapter?.id}`}
                open={shareOpen}
                onClose={() => setShareOpen(false)}
            />
            <ReportDialog
                open={reportDialogOpen}
                onClose={() => setReportDialogOpen(false)}
                onSend={async (data) => {
                    await clientFetch.post(`/chapters/${chapter.id}/report`, {
                        body: JSON.stringify({
                            type: data.reportType,
                            comment: data.comment
                        })
                    })
                }}
            />
        </>
    )
}